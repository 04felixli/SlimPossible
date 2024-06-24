import { ExerciseInList } from "@/app/exercises/interfaces/exercises";
import { IWorkoutTemplate } from "./templateInterfaces";
import { IWorkoutHistory } from "./historyInterfaces";

export interface ResponseBase {
    success: string;
    msg: string;
}

export interface ResponseGetExerciseInList extends ResponseBase {
    exercises: ExerciseInList[];
}

export interface ResponseGetAllWorkoutHistory {
    pastWorkouts: IWorkoutHistory[];
}

export interface ResponseGetAllWorkoutTemplates {
    workoutTemplates: IWorkoutTemplate[]
}

export interface ResponseGetWorkoutTemplateById {
    workoutTemplate: IWorkoutTemplate
}

