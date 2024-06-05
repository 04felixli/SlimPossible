import React from 'react'
import { GetExerciseList } from '@/app/global components/Library/apiCalls';
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import SelectableExerciseCard from './SelectableExerciseCard';
import { Workout } from '../objects/classes';

interface Props {
    exercises: ExerciseInList[];
    workout: Workout;
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    singleSelect: boolean;
}

const ExercisesList = async ({ exercises, workout, setWorkout, singleSelect }: Props) => {
    return (
        <div>
            <SelectableExerciseCard workout={workout} setWorkout={setWorkout} exercises={exercises} singleSelect={singleSelect} />
        </div>
    )
}

export default ExercisesList