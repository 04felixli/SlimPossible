import React from 'react'
import PageLayout from '@/app/global components/layout'
import PageName from '@/app/global components/PageName'
import Timer from './components/Timer'
import ExerciseTrackingCards from './components/ExerciseTrackingCards'
import { GetWorkoutTime } from '@/app/global components/Library/utilFunctions'
import WorkoutButtons from '../components/WorkoutButtons'

const start = () => {
    return (
        <PageLayout>
            <PageName name={GetWorkoutTime() + " Workout"} />
            <Timer />
            <ExerciseTrackingCards />
            <WorkoutButtons />
        </PageLayout>
    )
}

export default start