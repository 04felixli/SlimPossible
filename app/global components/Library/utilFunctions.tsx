import { Workout, Exercise, WorkoutSet } from "@/app/workout/objects/classes";
import { IWorkoutTemplate, IExerciseTemplate, IWorkoutSetTemplate } from "../Interfaces/templateInterfaces";
import { IExerciseInWorkoutHistory, ISetInExerciseInWorkoutHistory, IWorkoutHistory } from "../Interfaces/historyInterfaces";
import { parseISO, format } from 'date-fns';
import { CookieValueType, localStorageKeys } from "@/app/contexts/util/workoutFunctions";

export const computeTotalVolume = (workout: Workout): number => {
    let totalVolume = 0;

    workout.exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
            if (set.isCompleted && set.weight > 0 && set.reps > 0) {
                let weightInLbs = exercise.weightUnit === 'kgs'
                    ? parseFloat((set.weight * 2.20462).toFixed(2))
                    : parseFloat(set.weight.toFixed(2));

                totalVolume += weightInLbs * set.reps;
            }
        });
    });

    return parseFloat(totalVolume.toFixed(2));
};

export const formatTotalWorkoutsDuration = (totalSeconds: number): string => {
    if (totalSeconds < 0) {
        return 'Please enter valid start and end times';
    }

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;
    const secondsInYear = 31536000;

    const years = Math.floor(totalSeconds / secondsInYear);
    totalSeconds %= secondsInYear;

    const days = Math.floor(totalSeconds / secondsInDay);
    totalSeconds %= secondsInDay;

    const hours = Math.floor(totalSeconds / secondsInHour);
    const minutes = Math.floor((totalSeconds % secondsInHour) / secondsInMinute);

    const formattedYears = years > 0 ? `${years}y` : '';
    const formattedDays = days > 0 ? `${days}d` : '';
    const formattedHours = hours > 0 ? `${hours}h` : '';
    const formattedMinutes = (years > 0 || days > 0 || hours > 0) && minutes === 0 ? '' : `${minutes}min`;

    const formattedDuration = [formattedYears, formattedDays, formattedHours, formattedMinutes].filter(Boolean).join(' ');

    return formattedDuration;
};


export const formatDuration = (totalSeconds: number): string => {
    if (totalSeconds < 0) {
        return 'Please enter valid start and end times';
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const formattedHours = hours > 0 ? `${hours}h` : '';
    const formattedMinutes = (hours > 0 && minutes == 0) ? '' : `${minutes}min`;

    const formattedDuration = formattedHours + " " + formattedMinutes;

    return formattedDuration;
};

// Convert a duration in seconds to a string format given the start and end dates
export const getFormattedDurationStringGivenStartAndEnd = (start?: Date, end?: Date): string => {
    if (!start || !end) {
        return formatDuration(0);
    }

    const setSecondsToZero = (date: Date): Date => {
        const newDate = new Date(date);
        newDate.setSeconds(0, 0); // Set seconds and milliseconds to zero
        return newDate;
    };

    const startWithoutSeconds = setSecondsToZero(new Date(start));
    const endWithoutSeconds = setSecondsToZero(new Date(end));

    const diffInSeconds = Math.floor((endWithoutSeconds.getTime() - startWithoutSeconds.getTime()) / 1000);
    return formatDuration(diffInSeconds);
}

export const formatTime = (date: Date) => {
    return format(date, 'yyyy-MM-dd, hh:mm a');
};

export const GetWorkoutTime = (): string => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "Morning";
    } else if (hour >= 12 && hour < 18) {
        return "Afternoon";
    } else if (hour >= 18 && hour < 21) {
        return "Evening";
    } else {
        return "Night";
    }
}

// Helper function to convert IWorkoutTemplate to Workout object
export const convertIWorkoutTemplateToWorkout = (rawTemplate: IWorkoutTemplate): Workout => {
    const workout = new Workout();
    workout.id = rawTemplate.id;
    workout.name = rawTemplate.name;
    workout.duration = rawTemplate.duration;
    workout.date = new Date(rawTemplate.createdDate);
    workout.totalNumExercisesAddedEver = rawTemplate.exercises.length;
    workout.exercises = rawTemplate.exercises.map((exercise, index) => convertIExerciseTemplateToExercise(exercise, index));
    return workout;
}

// Helper function to convert IExerciseTemplate to Exercise object
export const convertIExerciseTemplateToExercise = (rawExercise: IExerciseTemplate, index: number): Exercise => {
    const exercise = new Exercise(
        rawExercise.id,
        rawExercise.name,
        rawExercise.equipment,
        rawExercise.targetMuscle,
        rawExercise.weightUnit,
        index, // for insertion number
        rawExercise.sets.map(set => convertIWorkoutSetTemplateToWorkoutSet(set)),
        rawExercise.exerciseInTemplateId
    );
    exercise.notes = rawExercise.notes;
    exercise.showNotes = true;
    return exercise;
}

// Helper function to convert IWorkoutSetTemplate to WorkoutSet object
export const convertIWorkoutSetTemplateToWorkoutSet = (rawSet: IWorkoutSetTemplate): WorkoutSet => {
    const set = new WorkoutSet(rawSet.setNumber);
    set.id = rawSet.id;
    set.weight = rawSet.weight;
    set.reps = rawSet.reps;
    set.isCompleted = rawSet.isCompleted;
    return set;
}

// Helper function to convert IWorkoutHistory to Workout object
export const convertIWorkoutHistoryToWorkout = (rawTemplate: IWorkoutHistory): Workout => {
    const workout = new Workout();
    workout.id = rawTemplate.id;
    workout.name = rawTemplate.name;
    workout.duration = rawTemplate.duration;
    workout.date = new Date(rawTemplate.createdDate);
    workout.startTime = rawTemplate.startTime;
    workout.endTime = rawTemplate.endTime;
    workout.totalNumExercisesAddedEver = rawTemplate.exercises.length;
    workout.exercises = rawTemplate.exercises.map((exercise, index) => convertIExerciseInWorkoutHistoryToExercise(exercise, index));
    return workout;
}

// Helper function to convert IExerciseInWorkoutHistory to Exercise object
export const convertIExerciseInWorkoutHistoryToExercise = (rawExercise: IExerciseInWorkoutHistory, index: number): Exercise => {
    const exercise = new Exercise(
        rawExercise.id,
        rawExercise.name,
        rawExercise.equipment,
        rawExercise.targetMuscle,
        rawExercise.weightUnit,
        index, // for insertion number
        rawExercise.sets.map(set => convertISetInExerciseInWorkoutHistoryToWorkoutSet(set)),
        rawExercise.exerciseInHistoryId
    );
    exercise.notes = rawExercise.notes;
    exercise.showNotes = true;
    return exercise;
}

// Helper function to convert ISetInExerciseInWorkoutHistory to WorkoutSet object
export const convertISetInExerciseInWorkoutHistoryToWorkoutSet = (rawSet: ISetInExerciseInWorkoutHistory): WorkoutSet => {
    const set = new WorkoutSet(rawSet.setNumber);
    set.id = rawSet.id;
    set.weight = rawSet.weight;
    set.reps = rawSet.reps;
    set.isCompleted = rawSet.isCompleted;
    return set;
}

// Helper function to set local storage
export const setLocalStorage = (name: string, value: any) => {
    // Convert the value to a JSON string and store it
    localStorage.setItem(name, JSON.stringify(value));
}

// Helper function to delete local storage
export const deleteLocalStorage = (name: string) => {
    // Remove the item from local storage
    localStorage.removeItem(name);
}

// Helper function to set a cookie
export const setCookies = (name: string, value: any, days: number) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${JSON.stringify(value)}; expires=${expires.toUTCString()}; path=/;`;
}

// Helper function to delete a cookie
export const deleteCookies = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}