'use client'
import React, { useState } from 'react'
import Button from '@/app/global components/Buttons/Button';
import Link from 'next/link';
import PopUp from '../start/components/popups/PopUp';
import { IPopUp } from '../interfaces/popup';

const WorkoutButtons = () => {
    const [cancelWorkout, setCancelWorkout] = useState<boolean>(false);
    const [finishWorkout, setFinishWorkout] = useState<boolean>(false);

    const cancelWorkoutPopUpContent: IPopUp = {
        header: 'Cancel Workout?',
        subHeading: 'Are you sure you want to cancel this workout? All progress will be lost.',
        doIt: 'Cancel Workout',
        noDontDoIt: 'Resume'
    }

    const finishWorkoutPopUpContent: IPopUp = {
        header: 'Finish Workout?',
        subHeading: 'Only completed sets will be recorded.',
        doIt: 'Finish',
        noDontDoIt: 'Resume'
    }

    return (
        <div className='flex justify-around mt-5'>
            <Link href="/workout/start/selectExercises">
                <Button text={'Add'} />
            </Link>
            <Button text={'Finish'} onClickFunction={() => setFinishWorkout(true)} />
            <Button text={'Cancel'} onClickFunction={() => setCancelWorkout(true)} />
            {cancelWorkout && <PopUp popUp={cancelWorkoutPopUpContent} onDoIt={() => setCancelWorkout(false)} onDontDoIt={() => setCancelWorkout(false)} />}
            {finishWorkout && <PopUp popUp={finishWorkoutPopUpContent} onDoIt={() => setFinishWorkout(false)} onDontDoIt={() => setFinishWorkout(false)} />}
        </div>
    )
}

export default WorkoutButtons