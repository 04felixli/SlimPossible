import React from 'react'
import { ExerciseInList } from '../interfaces/exercises';
import { GetExerciseList } from '@/app/global components/Library/apiCalls';

interface Props {
    query: string;
}

const ExerciseList = async (props: Props) => {
    const exercises: ExerciseInList[] = await GetExerciseList(props.query);
    return (
        <div>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise.id} className='card-bg'>
                        <div className='items-center card-title-font'>{exercise.name}</div>
                        <div className='flex justify-between font-thin text-sm'>
                            <div>{exercise.equipment}</div>
                            <div>{exercise.targetMuscle}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ExerciseList