import { Workout, Exercise, WorkoutSet } from "@/app/workout/objects/classes";
import { IWorkoutTemplate, IExerciseTemplate, IWorkoutSetTemplate } from "../Interfaces/templateInterfaces";
import { IExerciseInWorkoutHistory, ISetInExerciseInWorkoutHistory, IWorkoutHistory } from "../Interfaces/historyInterfaces";
import { parseISO, format } from 'date-fns';

export const formatDuration = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}h:${String(minutes).padStart(2, '0')}m:${String(seconds).padStart(2, '0')}s`;

    return formattedTime;
};

// Convert a duration in seconds to a string format: hh:mm:ss given the start and end dates
export const getFormattedDurationStringGivenStartAndEnd = (start?: Date, end?: Date): string => {
    if (!start || !end) {
        return formatDuration(0);
    }

    const diffInSeconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    return formatDuration(diffInSeconds);
}

export const formatTime = (isoString: string) => {
    const date = parseISO(isoString);
    return format(date, 'yyyy-MM-dd, h:mm a');
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
    workout.exercises = rawTemplate.exercises.map(exercise => convertIExerciseTemplateToExercise(exercise));
    return workout;
}

// Helper function to convert IExerciseTemplate to Exercise object
export const convertIExerciseTemplateToExercise = (rawExercise: IExerciseTemplate): Exercise => {
    const exercise = new Exercise(
        rawExercise.id,
        rawExercise.name,
        rawExercise.equipment,
        rawExercise.targetMuscle,
        rawExercise.weightUnit,
        rawExercise.insertionNumber,
        rawExercise.sets.map(set => convertIWorkoutSetTemplateToWorkoutSet(set))
    );
    exercise.notes = rawExercise.notes;
    exercise.showNotes = true;
    return exercise;
}

// Helper function to convert IWorkoutSetTemplate to WorkoutSet object
export const convertIWorkoutSetTemplateToWorkoutSet = (rawSet: IWorkoutSetTemplate): WorkoutSet => {
    const set = new WorkoutSet(rawSet.setNumber);
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
    workout.date = rawTemplate.createdDate;
    workout.exercises = rawTemplate.exercises.map(exercise => convertIExerciseInWorkoutHistoryToExercise(exercise));
    return workout;
}

// Helper function to convert IExerciseInWorkoutHistory to Exercise object
export const convertIExerciseInWorkoutHistoryToExercise = (rawExercise: IExerciseInWorkoutHistory): Exercise => {
    const exercise = new Exercise(
        rawExercise.id,
        rawExercise.name,
        rawExercise.equipment,
        rawExercise.targetMuscle,
        rawExercise.weightUnit,
        rawExercise.insertionNumber,
        rawExercise.sets.map(set => convertISetInExerciseInWorkoutHistoryToWorkoutSet(set))
    );
    exercise.notes = rawExercise.notes;
    exercise.showNotes = true;
    return exercise;
}

// Helper function to convert ISetInExerciseInWorkoutHistory to WorkoutSet object
export const convertISetInExerciseInWorkoutHistoryToWorkoutSet = (rawSet: ISetInExerciseInWorkoutHistory): WorkoutSet => {
    const set = new WorkoutSet(rawSet.setNumber);
    set.weight = rawSet.weight;
    set.reps = rawSet.reps;
    set.isCompleted = true;
    return set;
}


