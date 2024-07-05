'use server'

import { NewExercise } from "@/app/exercises/components/PopUps/AddExercisePopUp";
import { PostCompletedWorkout, PostNewExercise } from "./apiCalls";
import { revalidatePath } from "next/cache";
import { Workout } from "@/app/workout/objects/classes";

export const addExerciseServerAction = async (newExercise: NewExercise): Promise<boolean> => {
    const posted = await PostNewExercise(newExercise);
    revalidatePath("/exercises");
    return posted;
}

export const postCompletedWorkoutServerAction = async (workout: Workout): Promise<boolean> => {
    const posted = await PostCompletedWorkout(workout);
    revalidatePath("/history");
    return posted;
}