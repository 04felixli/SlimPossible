'use client'
import { useHistory } from '@/app/contexts/historyContext';
import { useWorkout } from '@/app/contexts/workoutContext'
import { ExerciseInList } from '@/app/exercises/interfaces/exercises'
import SelectableExerciseCard from '@/app/global components/SelectableExerciseCard';
import React from 'react'

interface Props {
    exercises: ExerciseInList[];
    singleSelect: boolean;
}

const ExercisesListForHistory = ({ exercises, singleSelect }: Props) => {
    const { history, setHistory } = useHistory();
    return (
        <SelectableExerciseCard workout={history} setWorkout={setHistory} exercises={exercises} singleSelect={singleSelect} />
    )
}

export default ExercisesListForHistory