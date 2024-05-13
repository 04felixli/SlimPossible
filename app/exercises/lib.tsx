import { ResponseGetExerciseInList } from "./interfaces/apiInterfaces";
import { ExerciseInList } from "./interfaces/exercises";

const url = process.env.API_KEY;

export const GetExerciseList = async (searchInput: String = ""): Promise<ExerciseInList[]> => {
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