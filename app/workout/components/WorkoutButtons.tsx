'use client'
import React, { useState } from 'react'
import Button from '@/app/global components/Buttons/Button';
import Link from 'next/link';
import PopUp from './popups/PopUp';
import { IPopUp } from '../interfaces/popup';

interface Props {
    finishPopUpContent: IPopUp;
    cancelPopUpContent: IPopUp
    onAddRedirectRoute: string; // The url path to redirect to after the user clicks 'add'
}

const WorkoutButtons = ({ finishPopUpContent, cancelPopUpContent, onAddRedirectRoute }: Props) => {
    const [cancelWorkout, setCancelWorkout] = useState<boolean>(false);
    const [finishWorkout, setFinishWorkout] = useState<boolean>(false);

    return (
        <div className='flex justify-around mt-5'>
            <Link href={onAddRedirectRoute}>
                <Button text={'Add'} />
            </Link>
            <Button text={finishPopUpContent.buttonText} onClickFunction={() => setFinishWorkout(true)} />
            <Button text={cancelPopUpContent.buttonText} onClickFunction={() => setCancelWorkout(true)} />
            {cancelWorkout && <PopUp popUp={cancelPopUpContent} onDoIt={() => setCancelWorkout(false)} onDontDoIt={() => setCancelWorkout(false)} />}
            {finishWorkout && <PopUp popUp={finishPopUpContent} onDoIt={() => setFinishWorkout(false)} onDontDoIt={() => setFinishWorkout(false)} />}
        </div>
    )
}

export default WorkoutButtons