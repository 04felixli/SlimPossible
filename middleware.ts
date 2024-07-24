import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "./app/contexts/util/workoutFunctions";
import { Exercise } from "./app/workout/objects/classes";
import { redirect } from "next/navigation";

enum validateReplaceExerciseResponses {
    noWorkout = "No Workout",
    exerciseDoesntExist = "Exercise Doesn't Exist",
    valid = "valid"
}

// Users can only go to a replace exercise page if there is a workout started, and if the exercise they want to replace exists
const validateReplaceExercise = (req: NextRequest, cookieName: cookies, exerciseId: number, inoetr: number): validateReplaceExerciseResponses => {

    // Retrieve the cookie containing the workout data
    const workoutData = req.cookies.get(cookieName);

    // Parse the workout data
    let workout = null;
    if (workoutData) {
        try {
            workout = JSON.parse(workoutData.value);
        } catch (error) {
            console.error("Failed to parse workout data:", error);
        }
    } else {
        return validateReplaceExerciseResponses.noWorkout;
    }

    // Verify workout existence and presence of specific exercise
    const exerciseExists =
        workout &&
        workout.exercises &&
        workout.exercises.some(
            (exercise: Exercise) =>
                exercise.id === exerciseId && exercise.insertionNumber === Number(inoetr)
        );

    if (!exerciseExists) {
        return validateReplaceExerciseResponses.exerciseDoesntExist;
    }

    // Return undefined to indicate no redirect is needed
    return validateReplaceExerciseResponses.valid;
}

export default function middleware(req: NextRequest) {

    // Check if the user is trying to replace an exercise without starting a workout or an exercise that doesn't exist
    const url = req.nextUrl.clone();

    if (url.pathname == "/workout/start/replaceExercise") {
        const searchParams = new URLSearchParams(url.search);
        const id = Number(searchParams.get("id"));
        const inoetr = Number(searchParams.get("inoetr"));
        const validPathResponse = validateReplaceExercise(req, cookies.workout, id, inoetr);
        if (validPathResponse == validateReplaceExerciseResponses.noWorkout) {
            return NextResponse.redirect(new URL('/workout', req.url));
        } else if (validPathResponse == validateReplaceExerciseResponses.exerciseDoesntExist) {
            return NextResponse.redirect(new URL('/workout/start', req.url));
        }
    }

    // Authenticate user
    return withAuth(req);
}

export const config = {
    matcher: ["/dashboard/:path*", "/workout/:path*", "/history/:path*", "/exercises/:path*"]
};