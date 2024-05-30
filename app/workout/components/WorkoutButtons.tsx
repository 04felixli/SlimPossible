'use client'
import React, { useState } from 'react'
import Button from '@/app/global components/Buttons/Button';
import Link from 'next/link';
import PopUp from './popups/PopUp';
import { IPopUp } from '../interfaces/popup';
import { Exercise } from '../objects/classes';

interface Props {
    exercises: Exercise[];
    setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
    finishPopUpContent: IPopUp;
    cancelPopUpContent: IPopUp
    onAddRedirectRoute: string; // The url path to redirect to after the user clicks 'add'
}

const WorkoutButtons = ({ exercises, setExercises, finishPopUpContent, cancelPopUpContent, onAddRedirectRoute }: Props) => {
    const [openCancelPopUp, setOpenCancelPopUp] = useState<boolean>(false);
    const [openFinishPopUp, setOpenFinishPopUp] = useState<boolean>(false);

    enum action {
        complete = 'complete', // finish or save workout or workout template
        cancel = 'cancel' // cancel workout or workout template
    }

    const clearExercises = (cause: string) => {
        setExercises([]); // Temporary: Should send a post request to API
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