"use client"
import React, { useState } from 'react';
import { ExerciseInList } from '../interfaces/exercises';
import FilterCustomExercises from './FilterCustomExercises';
import FilterHiddenExercises from './FilterHiddenExercises';
import { IPopUp } from '@/app/workout/interfaces/popup';
import ConfirmationPopUp from '@/app/global components/popups/ConfirmationPopUp';
import HandleExercisePopUp from '@/app/global components/popups/HandleExercisePopUp';
import { updateExerciseServerAction } from '@/app/global components/Library/actions';


interface Props {
    exercises: ExerciseInList[];
}

const ExerciseList = ({ exercises }: Props) => {

    const [exerciseToEdit, setExerciseToEdit] = useState<ExerciseInList | null>(null);

    const handleClick = (exercise: ExerciseInList) => {
        setExerciseToEdit(exercise);
    }

    const userDoneEditing = () => {
        setExerciseToEdit(null);
    }

    return (
        <div>
            <ul className='mt-3'>
                {exercises.map((exercise) => (
                    <li key={exercise.id} className={`card-bg mb-3 cursor-pointer hover:scale-[101%] duration-300`} onClick={() => handleClick(exercise)}>
                        <div className='items-center card-title-font'>{exercise.name} {exercise.isCustom && <span className='font-thin'>(Custom)</span>}</div>
                        <div className='flex justify-between font-thin text-sm'>
                            <div>{exercise.equipment}</div>
                            <div>{exercise.targetMuscle}</div>
                        </div>
                    </li>
                ))}
            </ul>
            {exerciseToEdit && <HandleExercisePopUp exercise={exerciseToEdit} closePopUp={userDoneEditing} serverActionFunction={updateExerciseServerAction} />}
        </div>
    )
}

export default ExerciseList