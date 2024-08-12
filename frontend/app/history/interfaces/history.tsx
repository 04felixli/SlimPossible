// This file contains the interfaces of anything related to workout history
export interface SetsInExercisesInWorkoutHistory {
    weight: number;
    reps: number;
    setNumber: number;
}

export interface ExercisesInWorkoutHistory {
    id: number;
    name: string;
    equipment: string;
    targetMuscle: string;
    weightUnit: string;
    notes: string;
    sets: SetsInExercisesInWorkoutHistory[];
}

export interface WorkoutHistory {
    id: number;
    name: string;
    duration: number;
    date: Date;
    exercises: ExercisesInWorkoutHistory[];
}