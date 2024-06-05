'use client'
import React from 'react'
import { useTemplateExercises } from '@/app/contexts/workoutTemplateContext';
import WorkoutButtons from '@/app/workout/components/WorkoutButtons';
import { IPopUp } from '@/app/workout/interfaces/popup';
import { useTemplate } from '@/app/contexts/templateContext';

const WorkoutButtonsWrapper = () => {
    const { template, setTemplate } = useTemplate();
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
        <WorkoutButtons workout={template} setWorkout={setTemplate} finishPopUpContent={saveWorkoutTemplatePopUpContent} cancelPopUpContent={discardWorkoutTemplatePopUpContent} onAddRedirectRoute='/workout/templates/add-template/selectExercises' />
    )
}

export default WorkoutButtonsWrapper