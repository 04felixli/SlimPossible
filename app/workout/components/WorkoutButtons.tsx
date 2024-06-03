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
    cancelPopUpContent: IPopUp
    onAddRedirectRoute: string; // The url path to redirect to after the user clicks 'add'
}

const WorkoutButtons = ({ workout, setWorkout, finishPopUpContent, cancelPopUpContent, onAddRedirectRoute }: Props) => {
    const [openCancelPopUp, setOpenCancelPopUp] = useState<boolean>(false);
    const [openFinishPopUp, setOpenFinishPopUp] = useState<boolean>(false);

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
        <div className='flex justify-around mt-5'>
            <Link href={onAddRedirectRoute}>
                <Button text={'Add'} />
            </Link>
            <Button text={finishPopUpContent.buttonText} onClickFunction={() => setOpenFinishPopUp(true)} />
            <Button text={cancelPopUpContent.buttonText} onClickFunction={() => setOpenCancelPopUp(true)} />
            {openCancelPopUp && <PopUp popUpContent={cancelPopUpContent} onDoIt={() => clearExercises(action.cancel)} onDontDoIt={() => setOpenCancelPopUp(false)} />}
            {openFinishPopUp && <PopUp popUpContent={finishPopUpContent} onDoIt={() => clearExercises(action.complete)} onDontDoIt={() => setOpenFinishPopUp(false)} />}
        </div>
    )
}

export default WorkoutButtons