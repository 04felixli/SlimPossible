'use client'
import React, { useState } from 'react'
import Button from '@/app/global components/Buttons/Button';
import Link from 'next/link';
import PopUp from '../workout/components/popups/PopUp';
import { IPopUp } from '../workout/interfaces/popup';
import { action } from '../contexts/util/workoutFunctions';

interface Props {
    onEndFunction: (cause: action) => void; // function to run when workout / template editing / history editing ends
    postPopUpContent?: IPopUp;
    updatePopUpContent?: IPopUp;
    cancelPopUpContent: IPopUp;
    onAddRedirectRoute: string; // The url path to redirect to after the user clicks 'add'
    deleteButtonPopUpContent?: IPopUp;
    onDoItRedirectURL?: string // The url path to redirect to after the user confirms a popup action
}

const WorkoutButtons = ({ onEndFunction, postPopUpContent, updatePopUpContent, cancelPopUpContent, onAddRedirectRoute, deleteButtonPopUpContent, onDoItRedirectURL }: Props) => {
    if ((!postPopUpContent && !updatePopUpContent) || (postPopUpContent && updatePopUpContent)) {
        throw new Error('must have either post or update, but cannot have both');
    }

    // const [openCancelPopUp, setOpenCancelPopUp] = useState<boolean>(false);
    // const [openPostPopUp, setOpenPostPopUp] = useState<boolean>(false);
    // const [openUpdatePopUp, setOpenUpdatePopUp] = useState<boolean>(false);
    // const [openDeletePopUp, setOpenDeletePopUp] = useState<boolean>(false);

    const [popUpToShow, setPopUpToShow] = useState<action | null>(null);

    const clearExercises = (cause: action) => {
        setPopUpToShow(null)
        onEndFunction(cause);
    }

    return (
        <div className='flex flex-col'>
            <Link href={onAddRedirectRoute} className='mt-3 flex justify-center items-center'>
                <Button text={'Add Exercise'} className='w-full' />
            </Link>
            <div className='mt-5 flex justify-center items-center'>
                <Button text={postPopUpContent ? postPopUpContent.buttonText : updatePopUpContent!.buttonText} onClickFunction={() => setPopUpToShow(postPopUpContent ? action.post : action.update)} className='w-full' />
            </div>
            <div className='mt-3 flex justify-center items-center'>
                <Button text={cancelPopUpContent.buttonText} onClickFunction={() => setPopUpToShow(action.cancel)} className='w-full' />
            </div>
            {(popUpToShow == action.cancel) && <PopUp popUpContent={cancelPopUpContent} onDoIt={() => clearExercises(action.cancel)} onDontDoIt={() => setPopUpToShow(null)} onDoItRedirectURL={onDoItRedirectURL} />}
            {(popUpToShow == action.post) && postPopUpContent && <PopUp popUpContent={postPopUpContent} onDoIt={() => clearExercises(action.post)} onDontDoIt={() => setPopUpToShow(null)} onDoItRedirectURL={onDoItRedirectURL} />}
            {(popUpToShow == action.update) && updatePopUpContent && <PopUp popUpContent={updatePopUpContent} onDoIt={() => clearExercises(action.update)} onDontDoIt={() => setPopUpToShow(null)} onDoItRedirectURL={onDoItRedirectURL} />}
            {deleteButtonPopUpContent &&
                <div className='mt-3 flex justify-center items-center'>
                    <Button text={deleteButtonPopUpContent.buttonText} onClickFunction={() => setPopUpToShow(action.delete)} className='w-full' />
                </div>}
            {(popUpToShow == action.delete) && deleteButtonPopUpContent && <PopUp popUpContent={deleteButtonPopUpContent} onDoIt={() => clearExercises(action.delete)} onDontDoIt={() => setPopUpToShow(null)} onDoItRedirectURL={onDoItRedirectURL} />}
        </div>
    )
}

export default WorkoutButtons