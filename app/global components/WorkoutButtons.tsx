'use client'
import React, { useState } from 'react'
import Button from '@/app/global components/Buttons/Button';
import Link from 'next/link';
import PopUp from '../workout/components/popups/PopUp';
import { IPopUp } from '../workout/interfaces/popup';
import { Exercise, Workout } from '../workout/objects/classes';

interface Props {
    onEndFunction: () => void; // function to run when workout / template editing / history editing ends
    finishPopUpContent: IPopUp;
    cancelPopUpContent: IPopUp;
    onAddRedirectRoute: string; // The url path to redirect to after the user clicks 'add'
    deleteButtonPopUpContent?: IPopUp;
    onDoItRedirectURL?: string // The url path to redirect to after the user confirms a popup action
}

const WorkoutButtons = ({ onEndFunction, finishPopUpContent, cancelPopUpContent, onAddRedirectRoute, deleteButtonPopUpContent, onDoItRedirectURL }: Props) => {
    const [openCancelPopUp, setOpenCancelPopUp] = useState<boolean>(false);
    const [openFinishPopUp, setOpenFinishPopUp] = useState<boolean>(false);
    const [openDeletePopUp, setOpenDeletePopUp] = useState<boolean>(false);

    enum action {
        complete = 'complete', // finish or save workout or workout template
        cancel = 'cancel' // cancel workout or workout template
    }

    const clearExercises = (cause: string) => {
        onEndFunction();
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
            {openCancelPopUp && <PopUp popUpContent={cancelPopUpContent} onDoIt={() => clearExercises(action.cancel)} onDontDoIt={() => setOpenCancelPopUp(false)} onDoItRedirectURL={onDoItRedirectURL} />}
            {openFinishPopUp && <PopUp popUpContent={finishPopUpContent} onDoIt={() => clearExercises(action.complete)} onDontDoIt={() => setOpenFinishPopUp(false)} onDoItRedirectURL={onDoItRedirectURL} />}
            {deleteButtonPopUpContent &&
                <div className='mt-3 flex justify-center items-center'>
                    <Button text={deleteButtonPopUpContent.buttonText} onClickFunction={() => setOpenDeletePopUp(true)} className='w-full' />
                </div>}
            {openDeletePopUp && deleteButtonPopUpContent && <PopUp popUpContent={deleteButtonPopUpContent} onDoIt={() => clearExercises(action.complete)} onDontDoIt={() => setOpenDeletePopUp(false)} onDoItRedirectURL={onDoItRedirectURL} />}
        </div>
    )
}

export default WorkoutButtons