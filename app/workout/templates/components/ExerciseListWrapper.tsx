import React from 'react'
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import { GetExerciseList } from '@/app/global components/Library/apiCalls';
import ExercisesListForTemplate from './ExercisesListForTemplate';

interface Props {
    query: string;
    singleSelect: boolean;
}

const ExerciseListWrapper = async ({ query, singleSelect }: Props) => {
    const exercises: ExerciseInList[] = await GetExerciseList(query);
    return (
        <ExercisesListForTemplate exercises={exercises} singleSelect={singleSelect} />
    )
}

export default ExerciseListWrapper; 