// This file contains the interfaces of anything relating to API's
import { WorkoutTemplate } from "./templates";

export interface ResponseGetAllWorkoutTemplates {
    workoutTemplates: WorkoutTemplate[]
    success: string;
    msg: string;
}