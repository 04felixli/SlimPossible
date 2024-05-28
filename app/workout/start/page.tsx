import React from 'react'
import PageLayout from '@/app/global components/layout'
import PageName from '@/app/global components/PageName'
import Timer from './components/Timer'
import Button from '@/app/global components/Buttons/Button'
import Link from 'next/link'
import ExerciseTrackingCards from './components/ExerciseTrackingCards'
import { GetWorkoutTime } from '@/app/global components/Library/utilFunctions'
import StartWorkoutButtons from './components/StartWorkoutButtons'

const start = () => {
    return (
        <PageLayout>
            <PageName name={GetWorkoutTime() + " Workout"} />
            <Timer />
            <ExerciseTrackingCards />
            <StartWorkoutButtons />
        </PageLayout>
    )
}

export default start