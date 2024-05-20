import { SelectableExercise } from "./exercises";

export interface ResponseGetExerciseInList {
    exercises: SelectableExercise[];
    success: string;
    msg: string;
}