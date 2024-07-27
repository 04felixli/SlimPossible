import React from 'react'
import PageLayout from '@/app/global components/PageLayouts/layout'
import PageName from '@/app/global components/PageName'
import WorkoutButtonsWrapper from '../components/WorkoutButtonsWrapper'
import ExerciseTrackingCardsWrapper from '../components/ExerciseTrackingCardsWrapper'
import RepopulateTemplate from './RepopulateTemplate'

const addTemplate = () => {
    return (
        <PageLayout>
            <RepopulateTemplate />
            <PageName name={'New Template'} />
            <ExerciseTrackingCardsWrapper from={'add-template'} />
            <WorkoutButtonsWrapper from={'add-template'} />
        </PageLayout>
    )
}

export default addTemplate