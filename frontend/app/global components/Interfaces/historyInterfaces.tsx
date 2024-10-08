export interface IWorkoutHistory {
    id: number;
    name: string;
    duration: number;
    createdDate: Date;
    startTime: Date;
    endTime: Date;
    exercises: IExerciseInWorkoutHistory[];
}

export interface IExerciseInWorkoutHistory {
    id: number;
    exerciseInHistoryId: number;
    name: string;
    equipment: string;
    targetMuscle: string;
    weightUnit: string;
    notes: string;
    insertionNumber: number;
    sets: ISetInExerciseInWorkoutHistory[];
}

export interface ISetInExerciseInWorkoutHistory {
    id: number;
    weight: number;
    reps: number;
    setNumber: number;
    isCompleted: boolean; // Sets in workout histories are all completed by default
}