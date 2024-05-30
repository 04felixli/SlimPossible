import React from 'react'
import PageLayout from '@/app/global components/layout'
import PageName from '@/app/global components/PageName'
import { GetWorkoutTime } from '@/app/global components/Library/utilFunctions'
import WorkoutButtons from '../components/WorkoutButtons'
import TemplateTrackingCards from './components/TemplateTrackingCards'
import { IPopUp } from '../interfaces/popup'
import WorkoutButtonsWrapper from './components/WorkoutButtonsWrapper'

const addTemplate = () => {
    return (
        <PageLayout>
            <PageName name={'New Template'} />
            <TemplateTrackingCards />
            <WorkoutButtonsWrapper />
        </PageLayout>
    )
}

export default addTemplate