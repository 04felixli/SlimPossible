'use client'
import { useExercisesToTrack } from '@/app/contexts/exercisesToTrackContext';
import React from 'react'
import WorkoutButtons from '../../components/WorkoutButtons';
import { IPopUp } from '../../interfaces/popup';

const WorkoutButtonsWrapper = () => {
    const { exercisesToTrack, setExercisesToTrack } = useExercisesToTrack();

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
        <WorkoutButtons exercises={exercisesToTrack} setExercises={setExercisesToTrack} finishPopUpContent={finishWorkoutPopUpContent} cancelPopUpContent={cancelWorkoutPopUpContent} onAddRedirectRoute='/workout/start/selectExercises' />
    )
}

export default WorkoutButtonsWrapper