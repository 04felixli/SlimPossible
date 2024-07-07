'use client'
import React from 'react'
import { IPopUp } from '@/app/workout/interfaces/popup';
import { useTemplate } from '@/app/contexts/templateContext';
import WorkoutButtons from '@/app/global components/WorkoutButtons';

interface Props {
    from: string;
}

const WorkoutButtonsWrapper = ({ from }: Props) => {
    const { postTemplate } = useTemplate();

    // edit-template pop-ups
    const discardChangesToWorkoutTemplatePopUpContent: IPopUp = {
        buttonText: 'Discard Changes',
        header: 'Discard Changes?',
        subHeading: 'Are you sure you want to discard all changes? All changes will be lost.',
        doIt: 'Discard Changes',
        noDontDoIt: 'Go Back'
    }

    const saveChangesToWorkoutTemplatePopUpContent: IPopUp = {
        buttonText: 'Save Changes',
        header: 'Save Changes?',
        subHeading: 'This workout template will be updated.',
        doIt: 'Save Changes',
        noDontDoIt: 'Go Back'
    }

    const deleteWorkoutTemplatePopUpContent: IPopUp = {
        buttonText: 'Delete Template',
        header: 'Delete Workout Template?',
        subHeading: 'This workout template will be deleted. This action is irreversible.',
        doIt: 'Delete',
        noDontDoIt: 'Go Back'
    }

    // add-template pop-ups
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

    if (from === "edit-template") {
        return (
            <WorkoutButtons onEndFunction={postTemplate} finishPopUpContent={saveChangesToWorkoutTemplatePopUpContent} cancelPopUpContent={discardChangesToWorkoutTemplatePopUpContent} deleteButtonPopUpContent={deleteWorkoutTemplatePopUpContent} onAddRedirectRoute={`/workout/templates/selectExercises?from=${from}`} />
        )
    }

    // add-template page has no "Delete Template" option
    return (
        <WorkoutButtons onEndFunction={postTemplate} finishPopUpContent={saveWorkoutTemplatePopUpContent} cancelPopUpContent={discardWorkoutTemplatePopUpContent} onAddRedirectRoute={`/workout/templates/selectExercises?from=${from}`} />
    )

}

export default WorkoutButtonsWrapper