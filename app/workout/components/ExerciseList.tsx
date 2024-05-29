import React from 'react'
import { GetExerciseList } from '@/app/global components/Library/apiCalls';
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import SelectableExerciseCard from './SelectableExerciseCard';

interface Props {
    query: string;
    singleSelect: boolean;
}

const ExercisesList = async ({ query, singleSelect }: Props) => {
    const exercises: ExerciseInList[] = await GetExerciseList(query);
    return (
        <div>
            <SelectableExerciseCard exercises={exercises} singleSelect={singleSelect} />
        </div>
    )
}

export default ExercisesList