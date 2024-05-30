import React from 'react'
import PageLayout from '@/app/global components/layout'
import PageName from '@/app/global components/PageName'
import Timer from './components/Timer'
import { GetWorkoutTime } from '@/app/global components/Library/utilFunctions'
import WorkoutButtons from '../components/WorkoutButtons'
import WorkoutTrackingCards from './components/WorkoutTrackingCards'
import { IPopUp } from '../interfaces/popup'

const start = () => {
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
        <PageLayout>
            <PageName name={GetWorkoutTime() + " Workout"} />
            <Timer />
            <WorkoutTrackingCards />
            <WorkoutButtons finishPopUpContent={finishWorkoutPopUpContent} cancelPopUpContent={cancelWorkoutPopUpContent} onAddRedirectRoute='/workout/start/selectExercises' />
        </PageLayout>
    )
}

export default start