import { ExerciseInList } from "./exercises";

export interface ResponseGetExerciseInList {
    exercises: ExerciseInList[];
    success: string;
    msg: string;
}