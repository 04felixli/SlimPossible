import { GetWorkoutTime } from "../lib";


export class Workout {
    name: string;
    duration: number;
    date: Date;
    exercises: Exercises[];

    constructor() {
        this.name = GetWorkoutTime() + " Workout";
        this.duration = 0;
        this.date = new Date();
        this.exercises = []
    }
}

export class Exercises {
    weightUnit: string;
    notes: string;
    sets: Sets[]

    constructor() {
        this.weightUnit = "lbs";
        this.notes = "";
        this.sets = []
    }
}

export class Sets {
    weight: number;
    reps: number;
    setNumber: number;
    isCompleted: boolean;

    constructor() {
        this.weight = -1;
        this.reps = -1;
        this.setNumber = -1;
        this.isCompleted = false;
    }
}
