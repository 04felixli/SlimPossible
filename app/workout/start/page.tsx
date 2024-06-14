import React from 'react'
import PageLayout from '@/app/global components/layout'
import PageName from '@/app/global components/PageName'
import Timer from './components/Timer'
import { GetWorkoutTime } from '@/app/global components/Library/utilFunctions'
import WorkoutButtons from '../../global components/WorkoutButtons'
import WorkoutTrackingCards from './components/WorkoutTrackingCards'
import { IPopUp } from '../interfaces/popup'
import WorkoutButtonsWrapper from './components/WorkoutButtonsWrapper'

const start = () => {
    return (
        <PageLayout>
            <PageName name={GetWorkoutTime() + " Workout"} />
            <Timer />
            <WorkoutTrackingCards />
            <WorkoutButtonsWrapper />
        </PageLayout>
    )
}

export default start