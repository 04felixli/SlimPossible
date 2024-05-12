// This file handles any API calls and other functions 
import { WorkoutTemplate } from "./interfaces/templates";
import { ResponseGetAllWorkoutTemplates } from "./interfaces/apiInterfaces";

const url = process.env.API_KEY;

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