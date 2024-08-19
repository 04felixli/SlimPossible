import React from 'react';
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import { GetExerciseList } from '@/app/global components/Library/apiCalls';
import ExercisesListForHistory from './ExercisesListForHistory';

interface Props {
    query: string;
    singleSelect: boolean;
}

const ExerciseListWrapper = async ({ query, singleSelect }: Props) => {
    const exercises: ExerciseInList[] = await GetExerciseList(query);
    return (
        <ExercisesListForHistory exercises={exercises} singleSelect={singleSelect} />
    )
}

export default ExerciseListWrapper; 