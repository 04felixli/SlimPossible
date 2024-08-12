// This file contains anything relating to workout templates

export interface SetTemplate {
    isCompleted: boolean;
    weight: number;
    reps: number;
    setNumber: number;
}

export interface ExerciseTemplate {
    id: number;
    name: string;
    equipment: string;
    targetMuscle: string;
    weightUnit: string;
    notes: string;
    sets: SetTemplate[]
}

export interface WorkoutTemplate {
    id: number;
    name: string;
    exercises: ExerciseTemplate[];
    createdDate: Date;
}