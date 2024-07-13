import { ExerciseInList } from "@/app/exercises/interfaces/exercises";
import { ResponseBase, ResponseGetAllWorkoutHistory, ResponseGetAllWorkoutTemplates, ResponseGetExerciseInList, ResponseGetWorkoutTemplateById } from "../Interfaces/apiResponses";
import { WorkoutHistory } from "@/app/history/interfaces/history";
import { WorkoutTemplate } from "@/app/workout/interfaces/templates";
import { Exercise, Workout, WorkoutSet } from "@/app/workout/objects/classes";
import { IExerciseTemplate, IWorkoutSetTemplate, IWorkoutTemplate } from "../Interfaces/templateInterfaces";
import { IWorkoutHistory } from "../Interfaces/historyInterfaces";
import { convertIWorkoutTemplateToWorkout } from "./utilFunctions";
import { NewExercise } from "@/app/exercises/components/PopUps/AddExercisePopUp";

const url = process.env.API_KEY;
export const GetExerciseList = async (searchInput: string): Promise<ExerciseInList[]> => {
    try {
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

export const GetAllWorkoutHistoryAsync = async (): Promise<IWorkoutHistory[]> => {
    try {
        const res = await fetch(`${url}/api/Main/GetAllWorkouts`, { cache: 'no-store' });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const response: ResponseGetAllWorkoutHistory = await res.json();
        const histories: IWorkoutHistory[] = response.pastWorkouts;
        return histories;

    } catch (error) {
        console.error('There was an error fetching workout histories: ', error);
        throw error;
    }
}

export const GetAllWorkoutTemplatesAsync = async (): Promise<IWorkoutTemplate[]> => {
    try {
        const res = await fetch(`${url}/api/Main/GetAllWorkoutTemplates`, { cache: 'no-store' });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const response: ResponseGetAllWorkoutTemplates = await res.json();
        const templates: IWorkoutTemplate[] = response.workoutTemplates;
        return templates;

    } catch (error) {
        console.error('There was an error fetching workout templates: ', error);
        throw error;
    }
}

export const GetWorkoutTemplateById = async (id: number): Promise<Workout> => {
    try {
        const res = await fetch(`${url}/api/Main/GetWorkoutTemplate?workoutTemplateId=${id}`, { cache: 'no-store' });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const response: ResponseGetWorkoutTemplateById = await res.json();
        const rawTemplate: IWorkoutTemplate = response.workoutTemplate;

        const templateObject: Workout = convertIWorkoutTemplateToWorkout(rawTemplate);

        return templateObject;

    } catch (error) {
        console.error('There was an error fetching workout template: ', error);
        throw error;
    }
}

export const PostNewExercise = async (exerciseToAdd: NewExercise): Promise<boolean> => {
    try {
        const res = await fetch(`${url}/api/Main/AddExercise`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exerciseToAdd),
            cache: 'no-store'
        });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        return true;

    } catch (error) {
        console.error('There was an error posting a new exercise to the db: ', error);
        throw error;
    }
}

export const PostCompletedWorkout = async (workout: Workout): Promise<boolean> => {
    try {
        const res = await fetch(`${url}/api/Main/PostWorkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout),
            cache: 'no-store'
        });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        return true;

    } catch (error) {
        console.error('There was an error posting a workout to the db: ', error);
        throw error;
    }
}

export const PostTemplate = async (template: Workout): Promise<boolean> => {
    try {
        const res = await fetch(`${url}/api/Main/PostWorkoutTemplate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(template),
            cache: 'no-store'
        });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        return true;

    } catch (error) {
        console.error('There was an error posting a workout to the db: ', error);
        throw error;
    }
}

export const UpdateTemplate = async (template: Workout): Promise<boolean> => {
    try {
        const res = await fetch(`${url}/api/Main/UpdateTemplate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(template),
            cache: 'no-store'
        });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        return true;

    } catch (error) {
        console.error('There was an error updateing a template to the db: ', error);
        throw error;
    }
}

export const UpdateHistory = async (history: Workout): Promise<boolean> => {
    try {
        const res = await fetch(`${url}/api/Main/UpdateHistory`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(history),
            cache: 'no-store'
        });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        return true;

    } catch (error) {
        console.error('There was an error updateing a history to the db: ', error);
        throw error;
    }
}

