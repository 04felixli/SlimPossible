'use client'
import React from 'react'
import { IPopUp } from '@/app/workout/interfaces/popup';
import { useTemplate } from '@/app/contexts/templateContext';
import WorkoutButtons from '@/app/global components/WorkoutButtons';
import { useHistory } from '@/app/contexts/historyContext';

const WorkoutButtonsWrapper = () => {
    const { endHistory } = useHistory();

    // edit history pop-ups
    const discardChangesToWorkoutHistoryPopUpContent: IPopUp = {
        buttonText: 'Discard Changes',
        header: 'Discard Changes?',
        subHeading: 'Are you sure you want to discard all changes? All changes will be lost.',
        doIt: 'Discard Changes',
        noDontDoIt: 'Go Back'
    }

    const saveChangesToWorkoutHistoryPopUpContent: IPopUp = {
        buttonText: 'Save Changes',
        header: 'Save Changes?',
        subHeading: 'This workout will be updated.',
        doIt: 'Save Changes',
        noDontDoIt: 'Go Back'
    }

    const deleteWorkoutHistoryPopUpContent: IPopUp = {
        buttonText: 'Delete Workout',
        header: 'Delete Workout?',
        subHeading: 'This workout will be deleted. This action is irreversible.',
        doIt: 'Delete',
        noDontDoIt: 'Go Back'
    }

    return (
        <WorkoutButtons onEndFunction={endHistory} updatePopUpContent={saveChangesToWorkoutHistoryPopUpContent} cancelPopUpContent={discardChangesToWorkoutHistoryPopUpContent} deleteButtonPopUpContent={deleteWorkoutHistoryPopUpContent} onAddRedirectRoute={`/history/select-exercises`} onDoItRedirectURL='/history' />
    )
}

export default WorkoutButtonsWrapper