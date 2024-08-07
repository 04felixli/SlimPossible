'use server'

import { NewExercise } from "@/app/exercises/components/PopUps/AddExercisePopUp";
import { DeleteHistory, DeleteTemplate, PostCompletedWorkout, PostNewExercise, PostTemplate, ReorderTemplates, UpdateHistory, UpdateTemplate } from "./apiCalls";
import { revalidatePath } from "next/cache";
import { Workout } from "@/app/workout/objects/classes";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const isAuthenticated = async (): Promise<boolean> => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) {
        return false;
    }

    return true
}

export const setExpandedCookieFunction = async () => {
    // Access the cookies object
    const cookiesObject = cookies();

    // Get a specific cookie by name
    const expandedValue = cookiesObject.get("isExpanded");
    const isExpanded = expandedValue ? expandedValue.value === 'true' : (expandedValue === undefined ? true : false);
    const newExpandedState: boolean = !isExpanded;
    cookies().set('isExpanded', String(newExpandedState));
}

export const addExerciseServerAction = async (newExercise: NewExercise): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const posted = await PostNewExercise(newExercise);
    revalidatePath("/exercises");
    return posted;
}

export const postCompletedWorkoutServerAction = async (workout: Workout): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const posted = await PostCompletedWorkout(workout);
    revalidatePath("/history");
    return posted;
}

export const postTemplateServerAction = async (template: Workout): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const posted = await PostTemplate(template);
    revalidatePath("/workout");
    return posted;
}

export const updateTemplateServerAction = async (template: Workout): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const posted = await UpdateTemplate(template);
    revalidatePath("/workout");
    return posted;
}

export const updateHistoryServerAction = async (history: Workout): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const posted = await UpdateHistory(history);
    revalidatePath("/history");
    return posted;
}

export const deleteTemplateServerAction = async (template: Workout): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const posted = await DeleteTemplate(template, template.id!);
    revalidatePath("/workout");
    return posted;
}

export const deleteHistoryServerAction = async (history: Workout): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const posted = await DeleteHistory(history, history.id!);
    revalidatePath("/history");
    return posted;
}

export const reorderTemplatesServerAction = async (templateIds: number[]): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const posted = await ReorderTemplates(templateIds);
    return posted;
}

export const navigateTo = async (path: string) => {
    redirect(path);
}