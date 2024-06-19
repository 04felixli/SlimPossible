'use client'
import React from 'react'
import WorkoutButtons from '../../../global components/WorkoutButtons';
import { IPopUp } from '../../interfaces/popup';
import { useWorkout } from '@/app/contexts/workoutContext';

const WorkoutButtonsWrapper = () => {
    const { endWorkout } = useWorkout();

    const cancelWorkoutPopUpContent: IPopUp = {
        buttonText: 'Cancel',
        header: 'Cancel Workout?',
        subHeading: 'Are you sure you want to cancel this workout? All progress will be lost.',
        doIt: 'Cancel Workout',
        noDontDoIt: 'Resume'
    }

    const finishWorkoutPopUpContent: IPopUp = {
        buttonText: 'Finish',
        header: 'Finish Workout?',
        subHeading: 'Only completed sets will be recorded.',
        doIt: 'Finish',
        noDontDoIt: 'Resume'
    }

    return (
        <WorkoutButtons onEndFunction={endWorkout} finishPopUpContent={finishWorkoutPopUpContent} cancelPopUpContent={cancelWorkoutPopUpContent} onAddRedirectRoute='/workout/start/selectExercises' />
    )
}

export default WorkoutButtonsWrapper