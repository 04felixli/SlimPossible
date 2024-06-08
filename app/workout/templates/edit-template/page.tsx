import React from 'react'
import PageLayout from '@/app/global components/layout';
import ExerciseTrackingCardsWrapper from '../components/ExerciseTrackingCardsWrapper';
import WorkoutButtonsWrapper from '../components/WorkoutButtonsWrapper';
import DeleteTemplateButton from './components/DeleteTemplateButton';
import ExistingTemplateName from './components/ExistingTemplateName';

const editTemplate = async () => {
    return (
        <PageLayout>
            <ExistingTemplateName />
            <ExerciseTrackingCardsWrapper from={'edit-template'} />
            <WorkoutButtonsWrapper from={'edit-template'} />
            <DeleteTemplateButton />
        </PageLayout>
    )
}

export default editTemplate