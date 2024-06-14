'use client'
import { useTemplate } from '@/app/contexts/templateContext';
import { ExerciseInList } from '@/app/exercises/interfaces/exercises'
import SelectableExerciseCard from '@/app/global components/SelectableExerciseCard';
import React from 'react'

interface Props {
    exercises: ExerciseInList[];
    singleSelect: boolean;
}

const ExercisesListForTemplate = ({ exercises, singleSelect }: Props) => {
    const { template, setTemplate } = useTemplate();
    return (
        <SelectableExerciseCard workout={template} setWorkout={setTemplate} exercises={exercises} singleSelect={singleSelect} />
    )
}

export default ExercisesListForTemplate