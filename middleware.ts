import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest, NextResponse } from "next/server";
import { cookieKeys, CookieValueType, localStorageKeys } from "./app/contexts/util/workoutFunctions";
import { Exercise } from "./app/workout/objects/classes";
import { redirect } from "next/navigation";

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

// Users can only go to select exercises page if there is a workout started
const validateSelectExercises = (req: NextRequest, cookieKey: cookieKeys): validationResponses => {
    const exercisesInWorkoutData = req.cookies.get(cookieKey);

    if (exercisesInWorkoutData) {
        return validationResponses.valid;
    } else {
        return validationResponses.noWorkout;
    }
}

export default function middleware(req: NextRequest) {

    // Check if the user is trying to replace an exercise without starting a workout or an exercise that doesn't exist
    const url = req.nextUrl.clone();

    if (url.pathname == "/workout/start/replaceExercise") {
        const searchParams = new URLSearchParams(url.search);
        const id = Number(searchParams.get("id"));
        const inoetr = Number(searchParams.get("inoetr"));
        const validPathResponse = validateReplaceExercise(req, cookieKeys.workout, id, inoetr);
        if (validPathResponse == validationResponses.noWorkout) {
            return NextResponse.redirect(new URL('/workout', req.url));
        } else if (validPathResponse == validationResponses.exerciseDoesntExist) {
            return NextResponse.redirect(new URL('/workout/start', req.url));
        }
    } else if (url.pathname == "/workout/start/selectExercises") {
        const validPathResponse = validateSelectExercises(req, cookieKeys.workout);
        if (validPathResponse == validationResponses.noWorkout) {
            return NextResponse.redirect(new URL('/workout', req.url));
        }
    }

    // Authenticate user
    return withAuth(req);
}

export const config = {
    matcher: ["/dashboard/:path*", "/workout/:path*", "/history/:path*", "/exercises/:path*"]
};