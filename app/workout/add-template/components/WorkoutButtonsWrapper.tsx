'use client'
import React from 'react'
import WorkoutButtons from '../../components/WorkoutButtons';
import { IPopUp } from '../../interfaces/popup';
import { useTemplateExercises } from '@/app/contexts/workoutTemplateContext';

const WorkoutButtonsWrapper = () => {
    const { templateExercises, setTemplateExercises } = useTemplateExercises();

    const discardWorkoutTemplatePopUpContent: IPopUp = {
        buttonText: 'Discard',
        header: 'Discard Template?',
        subHeading: 'Are you sure you want to discard this workout template? All information will be lost.',
        doIt: 'Discard Template',
        noDontDoIt: 'Go Back'
    }

    const saveWorkoutTemplatePopUpContent: IPopUp = {
        buttonText: 'Save',
        header: 'Save Workout Template?',
        subHeading: 'A new workout template will be created.',
        doIt: 'Save',
        noDontDoIt: 'Go Back'
    }

    return (
        <WorkoutButtons exercises={templateExercises} setExercises={setTemplateExercises} finishPopUpContent={saveWorkoutTemplatePopUpContent} cancelPopUpContent={discardWorkoutTemplatePopUpContent} onAddRedirectRoute='/workout/add-template/selectExercises' />
    )
}

export default WorkoutButtonsWrapper