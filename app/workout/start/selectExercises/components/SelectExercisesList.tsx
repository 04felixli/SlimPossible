import React from 'react'
import SelectableExerciseCard from './SelectableExerciseCard';
import { GetExerciseList } from '@/app/global components/Library/apiCalls';
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';

interface Props {
    query: string;
}

const SelectExercisesList = async (props: Props) => {
    const exercises: ExerciseInList[] = await GetExerciseList(props.query);
    return (
        <div>
            <SelectableExerciseCard exercises={exercises} />
        </div>
    )
}

export default SelectExercisesList