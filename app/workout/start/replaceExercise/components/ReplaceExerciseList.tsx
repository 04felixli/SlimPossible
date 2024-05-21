import React from 'react'
import { GetExerciseList } from '@/app/global components/Library/apiCalls';
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import ReplaceExerciseCard from './ReplaceExerciseCard';

interface Props {
    query: string;
}

const ReplaceExerciseList = async (props: Props) => {
    const exercises: ExerciseInList[] = await GetExerciseList(props.query);
    return (
        <div>
            <ReplaceExerciseCard exercises={exercises} />
        </div>
    )
}

export default ReplaceExerciseList