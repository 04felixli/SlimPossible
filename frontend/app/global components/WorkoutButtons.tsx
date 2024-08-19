'use client'
import React, { useState } from 'react';
import Button from '@/app/global components/Buttons/Button';
import { IPopUp } from '../workout/interfaces/popup';
import { action } from '../contexts/util/workoutFunctions';
import ConfirmationPopUp from './popups/ConfirmationPopUp';
import CustomLink from './CustomLink';

interface Props {
    onEndFunction: (cause: action) => void; // function to run when workout / template editing / history editing ends
    postPopUpContent?: IPopUp;
    updatePopUpContent?: IPopUp;
    cancelPopUpContent: IPopUp;
    onAddRedirectRoute: string; // The url path to redirect to after the user clicks 'add'
    deleteButtonPopUpContent?: IPopUp;
}

const WorkoutButtons = ({ onEndFunction, postPopUpContent, updatePopUpContent, cancelPopUpContent, onAddRedirectRoute, deleteButtonPopUpContent }: Props) => {
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
            <CustomLink href={onAddRedirectRoute} className='mt-3 flex justify-center items-center black-button'>
                <Button text={'Add Exercise'} className='w-full' />
            </CustomLink>
            <div className='mt-5 flex justify-center items-center black-button'>
                <Button text={postPopUpContent ? postPopUpContent.buttonText : updatePopUpContent!.buttonText} onClickFunction={() => setPopUpToShow(postPopUpContent ? action.post : action.update)} className='w-full' />
            </div>
            <div className='mt-3 flex justify-center items-center black-button'>
                <Button text={cancelPopUpContent.buttonText} onClickFunction={() => setPopUpToShow(action.cancel)} className='w-full' />
            </div>
            {(popUpToShow == action.cancel) && <ConfirmationPopUp popUpContent={cancelPopUpContent} onDoIt={() => clearExercises(action.cancel)} onDontDoIt={() => setPopUpToShow(null)} />}
            {(popUpToShow == action.post) && postPopUpContent && <ConfirmationPopUp popUpContent={postPopUpContent} onDoIt={() => clearExercises(action.post)} onDontDoIt={() => setPopUpToShow(null)} />}
            {(popUpToShow == action.update) && updatePopUpContent && <ConfirmationPopUp popUpContent={updatePopUpContent} onDoIt={() => clearExercises(action.update)} onDontDoIt={() => setPopUpToShow(null)} />}
            {deleteButtonPopUpContent &&
                <div className='mt-3 flex justify-center items-center black-button'>
                    <Button text={deleteButtonPopUpContent.buttonText} onClickFunction={() => setPopUpToShow(action.delete)} className='w-full' />
                </div>}
            {(popUpToShow == action.delete) && deleteButtonPopUpContent && <ConfirmationPopUp popUpContent={deleteButtonPopUpContent} onDoIt={() => clearExercises(action.delete)} onDontDoIt={() => setPopUpToShow(null)} />}
        </div>
    )
}

export default WorkoutButtons