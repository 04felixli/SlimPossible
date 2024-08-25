import { ExerciseInList } from "@/app/exercises/interfaces/exercises";
import { ResponseGetAllWorkoutHistory, ResponseGetAllWorkoutTemplates, ResponseGetDashboardInfo, ResponseGetExerciseInList } from "../Interfaces/apiResponses";
import { Workout } from "@/app/global components/objects/classes";
import { IWorkoutTemplate } from "../Interfaces/templateInterfaces";
import { IWorkoutHistory } from "../Interfaces/historyInterfaces";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { IDashboardInfo } from "@/app/dashboard/page";
import { NewOrUpdatedExercise } from "../popups/HandleExercisePopUp";

const url = process.env.API_KEY;

const GetUser = async (): Promise<KindeUser | { id: string }> => {
    const { getUser } = getKindeServerSession();
    const user = await getUser() || { id: "default-id" };
    return user;
}

export const GetExerciseList = async (searchInput: string, filterByCustom: boolean, filterByHidden: boolean): Promise<ExerciseInList[]> => {
    try {
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/GetExerciseList?searchInput=${searchInput}&filterByCustom=${filterByCustom}&filterByHidden=${filterByHidden}&uuid=${user?.id}`);
        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const response: ResponseGetExerciseInList = await res.json();
        const histories: ExerciseInList[] = response.exercises;
        return histories;

    } catch (error) {
        console.error('There was an error fetching exercise list: ', error);
        throw error;
    }
}

export const GetAllWorkoutHistoryAsync = async (): Promise<IWorkoutHistory[]> => {
    try {
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/GetAllWorkouts?uuid=${user?.id}`);

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
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/GetAllWorkoutTemplates?uuid=${user?.id}`);

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

export const PostNewExercise = async (exerciseToAdd: NewOrUpdatedExercise): Promise<boolean> => {
    try {
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/AddExercise?uuid=${user?.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exerciseToAdd),
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

export const UpdateExercise = async (updatedExercise: NewOrUpdatedExercise): Promise<boolean> => {
    try {
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/UpdateExercise?uuid=${user?.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedExercise),
        });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        return true;

    } catch (error) {
        console.error('There was an error updating the exercise in the db: ', error);
        throw error;
    }
}

export const PostCompletedWorkout = async (workout: Workout): Promise<boolean> => {
    try {
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/PostWorkout?uuid=${user?.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout),
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
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/PostWorkoutTemplate?uuid=${user?.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(template),
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
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/UpdateTemplate?uuid=${user?.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(template),
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
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/UpdateHistory?uuid=${user?.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(history),
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

export const DeleteTemplate = async (template: Workout, templateId: number): Promise<boolean> => {
    try {
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/DeleteWorkoutTemplate?workoutTemplateId=${templateId}&uuid=${user?.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(template),
        });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        return true;

    } catch (error) {
        console.error('There was an error deleting the template: ', error);
        throw error;
    }
}

export const DeleteHistory = async (workout: Workout, workoutId: number): Promise<boolean> => {
    try {
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/DeleteWorkoutHistory?workoutHistoryId=${workoutId}&uuid=${user?.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout),
        });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        return true;

    } catch (error) {
        console.error('There was an error deleting the workout: ', error);
        throw error;
    }
}

export const ReorderTemplates = async (templateIds: number[]): Promise<boolean> => {
    try {
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/ReorderTemplates?uuid=${user?.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(templateIds),
        });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        return true;

    } catch (error) {
        console.error('There was an error reordering exercises in the db: ', error);
        throw error;
    }
}

export const GetDashboardInfo = async (): Promise<IDashboardInfo> => {
    try {
        const user = await GetUser();
        const res = await fetch(`${url}/api/Main/GetUserData?uuid=${user?.id}`);

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const response: ResponseGetDashboardInfo = await res.json();
        const data: IDashboardInfo = response.data;
        return data;

    } catch (error) {
        console.error('There was an error fetching dashboard information: ', error);
        throw error;
    }
}

