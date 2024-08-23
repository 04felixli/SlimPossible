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

    const [confirmEditPopUpContent, setConfirmEditPopUpContent] = useState<IPopUp | null>(null);
    const [showEditPopUp, setShowEditPopUp] = useState<boolean>(false);
    const [exerciseToEdit, setExerciseToEdit] = useState<ExerciseInList | null>(null);

    const handleClick = (exercise: ExerciseInList) => {
        if (exercise.isCustom) {
            setConfirmEditPopUpContent({
                buttonText: '',
                header: `Edit ${exercise.name} (${exercise.equipment})?`,
                subHeading: '',
                doIt: 'Edit',
                noDontDoIt: 'Cancel'
            });

            setExerciseToEdit(exercise);
        }
    }

    const userWantsToEdit = () => {
        setConfirmEditPopUpContent(null);
        setShowEditPopUp(true);
    };

    const userDoesntWantToEdit = () => {
        setConfirmEditPopUpContent(null);
        setExerciseToEdit(null);
    }

    const userDoneEditing = () => {
        setExerciseToEdit(null);
        setShowEditPopUp(false);
    }

    return (
        <div>
            <ul className='mt-8'>
                {exercises.map((exercise) => (
                    <li key={exercise.id} className={`card-bg mb-3 ${exercise.isCustom ? 'cursor-pointer hover:scale-[101%] duration-300' : ''}`} onClick={() => handleClick(exercise)}>
                        <div className='items-center card-title-font'>{exercise.name} {exercise.isCustom && <span className='font-thin'>(Custom)</span>}</div>
                        <div className='flex justify-between font-thin text-sm'>
                            <div>{exercise.equipment}</div>
                            <div>{exercise.targetMuscle}</div>
                        </div>
                    </li>
                ))}
            </ul>
            {confirmEditPopUpContent && <ConfirmationPopUp popUpContent={confirmEditPopUpContent} onDoIt={userWantsToEdit} onDontDoIt={userDoesntWantToEdit} />}
            {showEditPopUp && exerciseToEdit && <HandleExercisePopUp exercise={exerciseToEdit} closePopUp={userDoneEditing} serverActionFunction={updateExerciseServerAction} />}
        </div>
    )
}

export default ExerciseList