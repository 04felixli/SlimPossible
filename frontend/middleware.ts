import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest, NextResponse } from "next/server";
import { cookieKeys, CookieValueType } from "./app/contexts/util/workoutFunctions";

enum validationResponses {
    noWorkout = "No Workout",
    exerciseDoesntExist = "Exercise Doesn't Exist",
    valid = "valid"
}

// Users can only go to a replace exercise page if there is a workout started, and if the exercise they want to replace exists
const validateReplaceExercise = (req: NextRequest, cookieKey: cookieKeys, exerciseId: number, inoetr: number): validationResponses => {

    // Retrieve the cookie containing the exercise data
    const exercisesInWorkoutData = req.cookies.get(cookieKey);

    // Parse the workout data
    let exercisesInWorkout = null;
    if (exercisesInWorkoutData) {
        try {
            exercisesInWorkout = JSON.parse(exercisesInWorkoutData.value);
        } catch (error) {
            console.error("Failed to parse workout data:", error);
        }
    } else {
        return validationResponses.noWorkout;
    }

    // Verify workout existence and presence of specific exercise
    const exerciseExists =
        exercisesInWorkout.some(
            (exercise: CookieValueType) =>
                exercise.exerciseId === exerciseId && exercise.insertionNumber === inoetr
        );

    if (!exerciseExists) {
        return validationResponses.exerciseDoesntExist;
    }

    // Return undefined to indicate no redirect is needed
    return validationResponses.valid;
}

// Check if there is anything started 
const validateStarted = (req: NextRequest, cookieKey: cookieKeys): boolean => {
    const exercisesInWorkoutData = req.cookies.get(cookieKey);

    if (exercisesInWorkoutData) {
        return true;
    } else {
        return false;
    }
}

const validateEditTemplate = (req: NextRequest, cookieKey: cookieKeys): boolean => {
    if (!validateStarted(req, cookieKey)) {
        return false
    }

    const isEditData = req.cookies.get(cookieKeys.isEditTemplate);
    if (!isEditData) {
        return false
    }

    const parsedIsEdit = Boolean(JSON.parse(isEditData.value));

    if (parsedIsEdit) {
        return true;
    }

    return false;
}

const validateAddTemplate = (req: NextRequest, cookieKey: cookieKeys): boolean => {
    if (!validateStarted(req, cookieKey)) {
        return false
    }

    const isEditData = req.cookies.get(cookieKeys.isEditTemplate);
    if (!isEditData) {
        return false
    }

    const parsedIsEdit = Boolean(JSON.parse(isEditData.value));

    if (!parsedIsEdit) {
        return true;
    }

    return false;
}

export default function middleware(req: NextRequest) {

    // Check if the user is trying to replace an exercise without starting a workout or an exercise that doesn't exist
    const url = req.nextUrl.clone();

    if (url.pathname === "/workout/start/replaceExercise") {
        const searchParams = new URLSearchParams(url.search);
        const id = Number(searchParams.get("id"));
        const inoetr = Number(searchParams.get("inoetr"));
        const validPathResponse = validateReplaceExercise(req, cookieKeys.workout, id, inoetr);
        if (validPathResponse === validationResponses.noWorkout) {
            return NextResponse.redirect(new URL('/workout', req.url));
        } else if (validPathResponse === validationResponses.exerciseDoesntExist) {
            return NextResponse.redirect(new URL('/workout/start', req.url));
        }
    } else if (url.pathname === "/workout/start/selectExercises") {
        if (!validateStarted(req, cookieKeys.workout)) {
            return NextResponse.redirect(new URL('/workout', req.url));
        }
    } else if (url.pathname === "/workout/templates/edit-template") {
        if (!validateEditTemplate(req, cookieKeys.template)) {
            return NextResponse.redirect(new URL('/workout', req.url));
        }
    } else if (url.pathname === "/workout/templates/add-template") {
        if (!validateAddTemplate(req, cookieKeys.template)) {
            return NextResponse.redirect(new URL('/workout', req.url));
        }
    } else if (url.pathname === "/workout/templates/selectExercises") {
        const searchParams = new URLSearchParams(url.search);
        const from = String(searchParams.get("from"));
        if ((from === "edit-template" || from === "add-template") && !validateEditTemplate(req, cookieKeys.template) && !validateAddTemplate(req, cookieKeys.template)) {
            return NextResponse.redirect(new URL('/workout', req.url));
        } else if (from === "edit-template" && !validateEditTemplate(req, cookieKeys.template) && validateAddTemplate(req, cookieKeys.template)) {
            return NextResponse.redirect(new URL('/workout/templates/add-template', req.url));
        } else if (from === "add-template" && validateEditTemplate(req, cookieKeys.template) && !validateAddTemplate(req, cookieKeys.template)) {
            return NextResponse.redirect(new URL('/workout/templates/edit-template', req.url));
        }
    } else if (url.pathname === "/workout/templates/replaceExercise") {
        const searchParams = new URLSearchParams(url.search);
        const from = String(searchParams.get("from"));
        const id = Number(searchParams.get("id"));
        const inoetr = Number(searchParams.get("inoetr"));
        if ((from === "edit-template" || from === "add-template") && !validateEditTemplate(req, cookieKeys.template) && !validateAddTemplate(req, cookieKeys.template)) {
            return NextResponse.redirect(new URL('/workout', req.url));
        } else if (from === "edit-template" && !validateEditTemplate(req, cookieKeys.template) && validateAddTemplate(req, cookieKeys.template)) {
            return NextResponse.redirect(new URL('/workout/templates/add-template', req.url));
        } else if (from === "add-template" && validateEditTemplate(req, cookieKeys.template) && !validateAddTemplate(req, cookieKeys.template)) {
            return NextResponse.redirect(new URL('/workout/templates/edit-template', req.url));
        }
        const validPathResponse = validateReplaceExercise(req, cookieKeys.template, id, inoetr);
        if (validPathResponse === validationResponses.exerciseDoesntExist) {
            const redirectURL = "/workout/templates/" + from;
            return NextResponse.redirect(new URL(redirectURL, req.url));
        }
    } else if (url.pathname === "/history/edit" && !validateStarted(req, cookieKeys.history)) {
        return NextResponse.redirect(new URL('/history', req.url));
    } else if (url.pathname === "/history/replace-exercise") {
        const searchParams = new URLSearchParams(url.search);
        const id = Number(searchParams.get("id"));
        const inoetr = Number(searchParams.get("inoetr"));
        const validPathResponse = validateReplaceExercise(req, cookieKeys.history, id, inoetr);
        if (validPathResponse === validationResponses.noWorkout) {
            return NextResponse.redirect(new URL('/history', req.url));
        } else if (validPathResponse === validationResponses.exerciseDoesntExist) {
            return NextResponse.redirect(new URL('/history/edit', req.url));
        }
    } else if (url.pathname === "/history/select-exercises") {
        if (!validateStarted(req, cookieKeys.history)) {
            return NextResponse.redirect(new URL('/history', req.url));
        }
    }

    // Authenticate user
    return withAuth(req);
}

export const config = {
    matcher: ["/dashboard/:path*", "/workout/:path*", "/history/:path*", "/exercises/:path*"]
};