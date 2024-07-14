'use server'

import { NewExercise } from "@/app/exercises/components/PopUps/AddExercisePopUp";
import { DeleteTemplate, PostCompletedWorkout, PostNewExercise, PostTemplate, UpdateHistory, UpdateTemplate } from "./apiCalls";
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

export const postTemplateServerAction = async (template: Workout): Promise<boolean> => {
    const posted = await PostTemplate(template);
    revalidatePath("/workout");
    return posted;
}

export const updateTemplateServerAction = async (template: Workout): Promise<boolean> => {
    const posted = await UpdateTemplate(template);
    revalidatePath("/workout");
    return posted;
}

export const updateHistoryServerAction = async (history: Workout): Promise<boolean> => {
    const posted = await UpdateHistory(history);
    revalidatePath("/history");
    return posted;
}

export const deleteTemplateServerAction = async (template: Workout): Promise<boolean> => {
    const posted = await DeleteTemplate(template, template.id!);
    revalidatePath("/workout");
    return posted;
}