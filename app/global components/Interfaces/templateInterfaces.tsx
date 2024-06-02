export interface IWorkoutTemplate {
    name: string;
    duration: number;
    date: Date;
    exercises: IExerciseTemplate[];
}

export interface IExerciseTemplate {
    id: number;
    name: string;
    equipment: string;
    targetMuscle: string;
    weightUnit: string;
    notes: string;
    sets: IWorkoutSetTemplate[];
}

export interface IWorkoutSetTemplate {
    weight: number;
    reps: number;
    setNumber: number;
    isCompleted: boolean;
}