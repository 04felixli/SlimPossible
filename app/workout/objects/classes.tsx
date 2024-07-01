import { IWorkoutTemplate } from "@/app/global components/Interfaces/templateInterfaces";
import { GetWorkoutTime } from "@/app/global components/Library/utilFunctions";

export class Workout {
    id?: number
    name: string;
    startTime?: Date; // Keep track of workout start time
    endTime?: Date; // Keep track of workout end time
    duration: number;
    date: Date; // Useless property -> keep for now
    exercises: Exercise[]; // Exercises in the actual workout
    replacementExercise?: Exercise; // If the user wants to replace an exercise, this is where we store the replacement exercise object 
    exercisesToAdd: Exercise[]; // Stores the exercises the user wants to add to the actual workout
    totalNumExercisesAddedEver: number; // total number of times an exercise was added - this value never decreases 

    constructor() {
        this.name = GetWorkoutTime() + " Workout";
        this.duration = 0;
        this.date = new Date();
        this.exercises = [];
        this.exercisesToAdd = [];
        this.totalNumExercisesAddedEver = 0;
    }
}

// When mapping over exercises, an exercise is uniquely identified a combination of:
//      1. id
//      2. insertionNumber
export class Exercise {
    id: number;
    name: string;
    equipment: string;
    targetMuscle: string;
    weightUnit: string;
    notes: string;
    sets: WorkoutSet[];
    showNotes: boolean;
    insertionNumber: number; // The totalNumExercisesAddedEver value when we inserted the exercise - Set to -1 by default

    constructor(id: number, name: string, equipment: string, targetMuscle: string, weightUnit: string, insertionNumber?: number, sets?: WorkoutSet[]) {
        this.id = id;
        this.name = name;
        this.equipment = equipment;
        this.targetMuscle = targetMuscle;
        this.weightUnit = weightUnit;
        this.notes = "";
        this.sets = sets ? sets : [new WorkoutSet(1)];
        this.showNotes = false;
        this.insertionNumber = insertionNumber ? insertionNumber : (insertionNumber === 0 ? insertionNumber : -1);
    }
}

export class WorkoutSet {
    weight: number;
    reps: number;
    setNumber: number;
    isCompleted: boolean;

    constructor(setNumber: number, isCompleted: boolean = false) {
        this.weight = -1;
        this.reps = -1;
        this.setNumber = setNumber;
        this.isCompleted = isCompleted;
    }
}