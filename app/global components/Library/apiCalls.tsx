import { ExerciseInList } from "@/app/exercises/interfaces/exercises";
import { ResponseGetAllWorkoutHistory, ResponseGetAllWorkoutTemplates, ResponseGetExerciseInList, ResponseGetWorkoutTemplateById } from "../Interfaces/apiResponses";
import { WorkoutHistory } from "@/app/history/interfaces/history";
import { WorkoutTemplate } from "@/app/workout/interfaces/templates";
import { Exercise, Workout, WorkoutSet } from "@/app/workout/objects/classes";
import { IExerciseTemplate, IWorkoutSetTemplate, IWorkoutTemplate } from "../Interfaces/templateInterfaces";

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

// Helper function to convert IWorkoutTemplate to Workout object
const convertIWorkoutTemplateToWorkout = (rawTemplate: IWorkoutTemplate): Workout => {
    const workout = new Workout();
    workout.name = rawTemplate.name;
    workout.duration = rawTemplate.duration;
    workout.date = new Date(rawTemplate.date);
    workout.exercises = rawTemplate.exercises.map(exercise => convertIExerciseTemplateToExercise(exercise));
    return workout;
}

// Helper function to convert IExerciseTemplate to Exercise object
const convertIExerciseTemplateToExercise = (rawExercise: IExerciseTemplate): Exercise => {
    const exercise = new Exercise(
        rawExercise.id,
        rawExercise.name,
        rawExercise.equipment,
        rawExercise.targetMuscle,
        rawExercise.weightUnit,
        rawExercise.sets.map(set => convertIWorkoutSetTemplateToWorkoutSet(set))
    );
    exercise.notes = rawExercise.notes;
    exercise.showNotes = true;
    return exercise;
}

// Helper function to convert IWorkoutSetTemplate to WorkoutSet object
const convertIWorkoutSetTemplateToWorkoutSet = (rawSet: IWorkoutSetTemplate): WorkoutSet => {
    const set = new WorkoutSet(rawSet.setNumber);
    set.weight = rawSet.weight;
    set.reps = rawSet.reps;
    set.isCompleted = rawSet.isCompleted;
    return set;
}

