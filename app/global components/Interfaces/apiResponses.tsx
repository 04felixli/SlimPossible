import { ExerciseInList } from "@/app/exercises/interfaces/exercises";
import { WorkoutHistory } from "@/app/history/interfaces/history";
import { WorkoutTemplate } from "@/app/workout/interfaces/templates";
import { IWorkoutTemplate } from "./templateInterfaces";

export interface ResponseGetExerciseInList {
    exercises: ExerciseInList[];
    success: string;
    msg: string;
}

export interface ResponseGetAllWorkoutHistory {
    pastWorkouts: WorkoutHistory[];
    success: string;
    msg: string;
}

export interface ResponseGetAllWorkoutTemplates {
    workoutTemplates: WorkoutTemplate[]
    success: string;
    msg: string;
}

export interface ResponseGetWorkoutTemplateById {
    workoutTemplate: IWorkoutTemplate
    success: string;
    msg: string;
}