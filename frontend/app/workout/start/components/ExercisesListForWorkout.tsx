'use client'
import { useWorkout } from '@/app/contexts/workoutContext';
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import React from 'react';
import SelectableExerciseCard from '../../../global components/SelectableExerciseCard';

interface Props {
    exercises: ExerciseInList[];
    singleSelect: boolean;
}

const ExercisesListForWorkout = ({ exercises, singleSelect }: Props) => {
    const { workout, setWorkout, multipleExerciseSelect, singleExerciseSelect } = useWorkout();
    return (
        <SelectableExerciseCard
            workout={workout}
            setWorkout={setWorkout}
            multipleExerciseSelect={multipleExerciseSelect}
            singleExerciseSelect={singleExerciseSelect}
            exercises={exercises}
            singleSelect={singleSelect}
        />
    )
}

export default ExercisesListForWorkout