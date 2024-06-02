import React from 'react'
import PageLayout from '@/app/global components/layout'
import PageName from '@/app/global components/PageName'
import WorkoutButtonsWrapper from './components/WorkoutButtonsWrapper'
import ExerciseTrackingCardsWrapper from './components/ExerciseTrackingCardsWrapper'

const addTemplate = () => {
    return (
        <PageLayout>
            <PageName name={'New Template'} />
            <ExerciseTrackingCardsWrapper />
            <WorkoutButtonsWrapper />
        </PageLayout>
    )
}

export default addTemplate