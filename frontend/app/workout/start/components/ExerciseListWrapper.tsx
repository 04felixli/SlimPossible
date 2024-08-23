import React from 'react';
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import { GetExerciseList } from '@/app/global components/Library/apiCalls';
import ExercisesListForWorkout from './ExercisesListForWorkout';

interface Props {
    query: string;
    filterByCustom: boolean;
    filterByHidden: boolean;
    singleSelect: boolean;
}

const ExerciseListWrapper = async ({ query, singleSelect, filterByCustom, filterByHidden }: Props) => {
    const exercises: ExerciseInList[] = await GetExerciseList(query, filterByCustom, filterByHidden);
    return (
        <ExercisesListForWorkout exercises={exercises} singleSelect={singleSelect} />
    )
}

export default ExerciseListWrapper; 