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
    const { template, setTemplate, multipleExerciseSelect, singleExerciseSelect } = useTemplate();
    return (
        <SelectableExerciseCard workout={template} setWorkout={setTemplate} multipleExerciseSelect={multipleExerciseSelect} singleExerciseSelect={singleExerciseSelect} exercises={exercises} singleSelect={singleSelect} />
    )
}

export default ExercisesListForTemplate