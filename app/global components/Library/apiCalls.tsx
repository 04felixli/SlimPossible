import { ExerciseInList } from "@/app/exercises/interfaces/exercises";
import { ResponseGetAllWorkoutHistory, ResponseGetAllWorkoutTemplates, ResponseGetExerciseInList } from "../Interfaces/apiResponses";
import { WorkoutHistory } from "@/app/history/interfaces/history";
import { WorkoutTemplate } from "@/app/workout/interfaces/templates";

const url = process.env.API_KEY;

export const GetExerciseList = async (searchInput: string): Promise<ExerciseInList[]> => {
    try {
        // console.log("Fetching exercise list at: " + `${url}/api/Main/GetExerciseList?searchInput=${searchInput}`)
        const res = await fetch(`${url}/api/Main/GetExerciseList?searchInput=${searchInput}`, { cache: 'no-store' });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const response: ResponseGetExerciseInList = await res.json();
        const histories: ExerciseInList[] = response.exercises;
        return histories;

    } catch (error) {
        console.error('There was an error fetching workout histories: ', error);
        throw error;
    }
}

export const GetAllWorkoutHistoryAsync = async (): Promise<WorkoutHistory[]> => {
    try {
        const res = await fetch(`${url}/api/Main/GetAllWorkouts`, { cache: 'no-store' });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const response: ResponseGetAllWorkoutHistory = await res.json();
        const histories: WorkoutHistory[] = response.pastWorkouts;
        return histories;

    } catch (error) {
        console.error('There was an error fetching workout histories: ', error);
        throw error;
    }
}

export const GetAllWorkoutTemplatesAsync = async (): Promise<WorkoutTemplate[]> => {
    try {
        const res = await fetch(`${url}/api/Main/GetAllWorkoutTemplates`, { cache: 'no-store' });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const response: ResponseGetAllWorkoutTemplates = await res.json();
        const templates: WorkoutTemplate[] = response.workoutTemplates;
        return templates;

    } catch (error) {
        console.error('There was an error fetching workout templates: ', error);
        throw error;
    }
}

