import React from 'react'
import PageLayout from '@/app/global components/layout'
import PageName from '@/app/global components/PageName'
import { GetWorkoutTime } from '@/app/global components/Library/utilFunctions'
import WorkoutButtons from '../components/WorkoutButtons'
import TemplateTrackingCards from './components/TemplateTrackingCards'
import { IPopUp } from '../interfaces/popup'

const addTemplate = () => {
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
        <PageLayout>
            <PageName name={'New Template'} />
            <TemplateTrackingCards />
            <WorkoutButtons finishPopUpContent={saveWorkoutTemplatePopUpContent} cancelPopUpContent={discardWorkoutTemplatePopUpContent} onAddRedirectRoute='/workout/add-template/selectExercises' />
        </PageLayout>
    )
}

export default addTemplate