import React from 'react'
import PageLayout from '@/app/global components/PageLayouts/layout';
import ExerciseTrackingCardsWrapper from '../components/ExerciseTrackingCardsWrapper';
import WorkoutButtonsWrapper from '../components/WorkoutButtonsWrapper';
import ExistingTemplateName from './components/ExistingTemplateName';
import RepopulateTemplate from '../add-template/RepopulateTemplate';

const editTemplate = async () => {
    return (
        <PageLayout>
            <RepopulateTemplate />
            <ExistingTemplateName />
            <ExerciseTrackingCardsWrapper from={'edit-template'} />
            <WorkoutButtonsWrapper from={'edit-template'} />
        </PageLayout>
    )
}

export default editTemplate