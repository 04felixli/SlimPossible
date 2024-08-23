'use server'

import { DeleteHistory, DeleteTemplate, PostCompletedWorkout, PostNewExercise, PostTemplate, ReorderTemplates, UpdateExercise, UpdateHistory, UpdateTemplate } from "./apiCalls";
import { revalidatePath } from "next/cache";
import { Workout } from "@/app/global components/objects/classes";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NewOrUpdatedExercise } from "../popups/HandleExercisePopUp";

const isAuthenticated = async (): Promise<boolean> => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) {
        return false;
    }

    return true
}

export const redirectServerAction = async (path: string) => {
    redirect(path);
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

export const addExerciseServerAction = async (newExercise: NewOrUpdatedExercise): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const posted = await PostNewExercise(newExercise);
    revalidatePath("/exercises");
    return posted;
}

export const updateExerciseServerAction = async (updatedExercise: NewOrUpdatedExercise): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const updated = await UpdateExercise(updatedExercise);
    revalidatePath("/exercises");
    return updated;
}

export const postCompletedWorkoutServerAction = async (workout: Workout): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const posted = await PostCompletedWorkout(workout);
    revalidatePath("/dashboard");
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
    revalidatePath("/dashboard");
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
    revalidatePath("/dashboard");
    revalidatePath("/history");
    return posted;
}

export const reorderTemplatesServerAction = async (templateIds: number[]): Promise<boolean> => {
    if (!isAuthenticated) {
        redirect("/api/auth/login");
    }
    const posted = await ReorderTemplates(templateIds);
    revalidatePath("/workout");
    return posted;
}

export const navigateTo = async (path: string) => {
    redirect(path);
}

