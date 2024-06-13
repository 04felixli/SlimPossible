import { ExerciseInList } from "@/app/exercises/interfaces/exercises";
import { IWorkoutTemplate } from "./templateInterfaces";
import { IWorkoutHistory } from "./historyInterfaces";

export interface ResponseGetExerciseInList {
    exercises: ExerciseInList[];
    success: string;
    msg: string;
}

export interface ResponseGetAllWorkoutHistory {
    pastWorkouts: IWorkoutHistory[];
    success: string;
    msg: string;
}

export interface ResponseGetAllWorkoutTemplates {
    workoutTemplates: IWorkoutTemplate[]
    success: string;
    msg: string;
}

export interface ResponseGetWorkoutTemplateById {
    workoutTemplate: IWorkoutTemplate
    success: string;
    msg: string;
}