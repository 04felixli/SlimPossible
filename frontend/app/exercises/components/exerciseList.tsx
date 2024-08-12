import React from 'react'
import { ExerciseInList } from '../interfaces/exercises';


interface Props {
    exercises: ExerciseInList[];
}

const ExerciseList = ({ exercises }: Props) => {
    return (
        <div>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise.id} className='card-bg mb-3'>
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