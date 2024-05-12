import { WorkoutHistory } from "./history";

// This file contains anything related to the structure of an API response
export interface ResponseGetAllWorkoutHistory {
    pastWorkouts: WorkoutHistory[];
    success: string;
    msg: string;
}