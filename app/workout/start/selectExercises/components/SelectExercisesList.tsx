import React from 'react'
import { SelectableExercise } from '../interfaces/exercises';
import { GetSelectableExercisesList } from '../lib';
import SelectableExerciseCard from './SelectableExerciseCard';

interface Props {
    query: string;
}

const SelectExercisesList = async (props: Props) => {
    const exercises: SelectableExercise[] = await GetSelectableExercisesList(props.query);
    return (
        <div>
            <SelectableExerciseCard exercises={exercises} />
        </div>
    )
}

export default SelectExercisesList