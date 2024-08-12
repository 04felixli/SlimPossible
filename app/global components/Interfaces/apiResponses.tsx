import { ExerciseInList } from "@/app/exercises/interfaces/exercises";
import { IWorkoutTemplate } from "./templateInterfaces";
import { IWorkoutHistory } from "./historyInterfaces";
import { IDashboardInfo } from "@/app/dashboard/page";

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

export interface ResponseGetDashboardInfo {
    data: IDashboardInfo;
}

