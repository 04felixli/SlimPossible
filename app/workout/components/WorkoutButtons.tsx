'use client'
import React, { useState } from 'react'
import Button from '@/app/global components/Buttons/Button';
import Link from 'next/link';
import PopUp from './popups/PopUp';
import { IPopUp } from '../interfaces/popup';
import { Exercise, Workout } from '../objects/classes';

interface Props {
    workout: Workout;
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    finishPopUpContent: IPopUp;
    cancelPopUpContent: IPopUp;
    onAddRedirectRoute: string; // The url path to redirect to after the user clicks 'add'
    deleteButtonPopUpContent?: IPopUp;
}

const WorkoutButtons = ({ workout, setWorkout, finishPopUpContent, cancelPopUpContent, onAddRedirectRoute, deleteButtonPopUpContent }: Props) => {
    const [openCancelPopUp, setOpenCancelPopUp] = useState<boolean>(false);
    const [openFinishPopUp, setOpenFinishPopUp] = useState<boolean>(false);
    const [openDeletePopUp, setOpenDeletePopUp] = useState<boolean>(false);

    enum action {
        complete = 'complete', // finish or save workout or workout template
        cancel = 'cancel' // cancel workout or workout template
    }

    const clearExercises = (cause: string) => {
        // Temporary - We actually want to send a post request to API on complete, and clear if cancel...
        setWorkout(prevWorkout => {
            return { ...prevWorkout, exercises: [] };
        })
        if (cause === action.complete) {
            setOpenFinishPopUp(false);
        } else {
            setOpenCancelPopUp(false);
        }
    }

    return (
        <div className='flex flex-col'>
            <Link href={onAddRedirectRoute} className='mt-3 flex justify-center items-center'>
                <Button text={'Add Exercise'} className='w-full' />
            </Link>
            <div className='mt-5 flex justify-center items-center'>
                <Button text={finishPopUpContent.buttonText} onClickFunction={() => setOpenFinishPopUp(true)} className='w-full' />
            </div>
            <div className='mt-3 flex justify-center items-center'>
                <Button text={cancelPopUpContent.buttonText} onClickFunction={() => setOpenCancelPopUp(true)} className='w-full' />
            </div>
            {openCancelPopUp && <PopUp popUpContent={cancelPopUpContent} onDoIt={() => clearExercises(action.cancel)} onDontDoIt={() => setOpenCancelPopUp(false)} />}
            {openFinishPopUp && <PopUp popUpContent={finishPopUpContent} onDoIt={() => clearExercises(action.complete)} onDontDoIt={() => setOpenFinishPopUp(false)} />}
            {deleteButtonPopUpContent &&
                <div className='mt-3 flex justify-center items-center'>
                    <Button text={deleteButtonPopUpContent.buttonText} onClickFunction={() => setOpenDeletePopUp(true)} className='w-full' />
                </div>}
            {openDeletePopUp && deleteButtonPopUpContent && <PopUp popUpContent={deleteButtonPopUpContent} onDoIt={() => clearExercises(action.complete)} onDontDoIt={() => setOpenDeletePopUp(false)} />}
        </div>
    )
}

export default WorkoutButtons