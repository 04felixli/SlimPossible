// This file contains functions related to the workout history page

import { ResponseGetAllWorkoutHistory } from "./interfaces/apiInterfaces";
import { WorkoutHistory } from "./interfaces/history";

const url = process.env.API_KEY;

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

export const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}h:${String(minutes).padStart(2, '0')}m:${String(seconds).padStart(2, '0')}s`;

    return formattedTime;
};