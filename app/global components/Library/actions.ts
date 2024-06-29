'use server'

import { NewExercise } from "@/app/exercises/components/PopUps/AddExercisePopUp";
import { PostNewExercise } from "./apiCalls";
import { revalidatePath } from "next/cache";

export const addExerciseServerAction = async (newExercise: NewExercise): Promise<boolean> => {
    const posted = await PostNewExercise(newExercise);
    revalidatePath("/exercises");
    return posted;
}