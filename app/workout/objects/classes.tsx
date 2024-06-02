import { IWorkoutTemplate } from "@/app/global components/Interfaces/templateInterfaces";
import { GetWorkoutTime } from "@/app/global components/Library/utilFunctions";

export class Workout {
    name: string;
    duration: number;
    date: Date;
    exercises: Exercise[];

    constructor() {
        this.name = GetWorkoutTime() + " Workout";
        this.duration = 0;
        this.date = new Date();
        this.exercises = []
    }
}

export class Exercise {
    id: number;
    name: string;
    equipment: string;
    targetMuscle: string;
    weightUnit: string;
    notes: string;
    sets: WorkoutSet[];
    showNotes: boolean;

    constructor(id: number, name: string, equipment: string, targetMuscle: string, weightUnit: string, sets?: WorkoutSet[]) {
        this.id = id;
        this.name = name;
        this.equipment = equipment;
        this.targetMuscle = targetMuscle;
        this.weightUnit = weightUnit;
        this.notes = "";
        this.sets = sets ? sets : [new WorkoutSet(1)];
        this.showNotes = false;
    }
}

export class WorkoutSet {
    weight: number;
    reps: number;
    setNumber: number;
    isCompleted: boolean;

    constructor(setNumber: number) {
        this.weight = -1;
        this.reps = -1;
        this.setNumber = setNumber;
        this.isCompleted = false;
    }
}
