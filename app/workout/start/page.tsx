import React from 'react'
import PageLayout from '@/app/global components/layout'
import PageName from '@/app/global components/PageName'
import { GetWorkoutTime } from '@/app/global components/Library/utilFunctions'
import WorkoutTrackingCards from './components/WorkoutTrackingCards'
import WorkoutButtonsWrapper from './components/WorkoutButtonsWrapper'
import Timer from './components/Timer'

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