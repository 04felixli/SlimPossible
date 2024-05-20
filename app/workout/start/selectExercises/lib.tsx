import { ResponseGetExerciseInList } from "./interfaces/apiInterfaces";
import { SelectableExercise } from "./interfaces/exercises";

const url = process.env.API_KEY;

export const GetSelectableExercisesList = async (searchInput: string = ""): Promise<SelectableExercise[]> => {
    try {
        const res = await fetch(`${url}/api/Main/GetExerciseList?searchInput=${searchInput}`, { cache: 'no-store' });

        if (res.status !== 200) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }

        const response: ResponseGetExerciseInList = await res.json();
        const exerciseList: SelectableExercise[] = response.exercises;
        return exerciseList;

    } catch (error) {
        console.error('There was an error fetching exercise list: ', error);
        throw error;
    }
}