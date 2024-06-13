export interface IWorkoutHistory {
    id: number;
    name: string;
    duration: number;
    createdDate: Date;
    exercises: IExerciseInWorkoutHistory[];
}

export interface IExerciseInWorkoutHistory {
    id: number;
    name: string;
    equipment: string;
    targetMuscle: string;
    weightUnit: string;
    notes: string;
    insertionNumber: number;
    sets: ISetInExerciseInWorkoutHistory[];
}

export interface ISetInExerciseInWorkoutHistory {
    weight: number;
    reps: number;
    setNumber: number;
    // isCompleted: boolean; // Sets in workout histories are all completed by default
}