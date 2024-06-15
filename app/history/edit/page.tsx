import PageLayout from '@/app/global components/layout'
import React from 'react'
import WorkoutHistoryName from './components/WorkoutHistoryName'
import ExerciseTrackingCardsWrapper from './components/ExerciseTrackingCardsWrapper'
import WorkoutButtonsWrapper from './components/WorkoutButtonsWrapper'
import WorkoutHistorySubInfo from './components/WorkoutHistorySubInfo'

const editHistory = () => {
    return (
        <PageLayout>
            <WorkoutHistoryName />
            <WorkoutHistorySubInfo />
            <ExerciseTrackingCardsWrapper />
            <WorkoutButtonsWrapper />
        </PageLayout>
    )
}

export default editHistory