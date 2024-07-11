export interface IWorkoutTemplate {
    id: number;
    name: string;
    duration: number;
    createdDate: Date;
    exercises: IExerciseTemplate[];
}

export interface IExerciseTemplate {
    id: number;
    exerciseInTemplateId: number; // id of row in exercise_templates table
    name: string;
    equipment: string;
    targetMuscle: string;
    weightUnit: string;
    notes: string;
    insertionNumber: number;
    sets: IWorkoutSetTemplate[];
}

export interface IWorkoutSetTemplate {
    id: number;
    weight: number;
    reps: number;
    setNumber: number;
    isCompleted: boolean;
}