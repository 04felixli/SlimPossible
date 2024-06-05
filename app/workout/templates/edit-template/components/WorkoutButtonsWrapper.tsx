'use client'
import React from 'react'
import { useTemplateExercises } from '@/app/contexts/workoutTemplateContext';
import WorkoutButtons from '@/app/workout/components/WorkoutButtons';
import { IPopUp } from '@/app/workout/interfaces/popup';
import { useTemplate } from '@/app/contexts/templateContext';

interface Props {
    templateId: number;
}

const WorkoutButtonsWrapper = ({ templateId }: Props) => {
    const { template, setTemplate } = useTemplate();
    const { templateExercises, setTemplateExercises } = useTemplateExercises();

    const cancelTemplateChangesPopUpContent: IPopUp = {
        buttonText: 'Cancel',
        header: 'Cancel Changes?',
        subHeading: 'Are you sure you want to cancel the changes made to this workout template?',
        doIt: 'Cancel Changes',
        noDontDoIt: 'Go Back'
    }

    const saveTemplateChangesPopUpContent: IPopUp = {
        buttonText: 'Save',
        header: 'Save Changes?',
        subHeading: 'Your workout template will be changed.',
        doIt: 'Save',
        noDontDoIt: 'Go Back'
    }

    return (
        <WorkoutButtons workout={template} setWorkout={setTemplate} finishPopUpContent={saveTemplateChangesPopUpContent} cancelPopUpContent={cancelTemplateChangesPopUpContent} onAddRedirectRoute={`/workout/templates/edit-template/select-exercises?id=${templateId}`} />
    )
}

export default WorkoutButtonsWrapper