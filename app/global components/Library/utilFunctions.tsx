import { Workout, Exercise, WorkoutSet } from "@/app/workout/objects/classes";
import { IWorkoutTemplate, IExerciseTemplate, IWorkoutSetTemplate } from "../Interfaces/templateInterfaces";
import { IExerciseInWorkoutHistory, ISetInExerciseInWorkoutHistory, IWorkoutHistory } from "../Interfaces/historyInterfaces";
import { parseISO, format } from 'date-fns';

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

// Convert a duration in seconds to a string format: hh:mm:ss given the start and end dates
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
        rawExercise.sets.map(set => convertISetInExerciseInWorkoutHistoryToWorkoutSet(set))
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


