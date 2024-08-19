import React from 'react';
import PageLayout from '@/app/global components/PageLayouts/layout';
import ExerciseTrackingCardsWrapper from '../components/ExerciseTrackingCardsWrapper';
import WorkoutButtonsWrapper from '../components/WorkoutButtonsWrapper';
import RepopulateTemplate from '../components/RepopulateTemplate';
import ExistingTemplateName from './components/ExistingTemplateName';

const editTemplate = async () => {
    return (
        <PageLayout activePage='/workout'>
            <RepopulateTemplate />
            <ExistingTemplateName />
            <ExerciseTrackingCardsWrapper from={'edit-template'} />
            <WorkoutButtonsWrapper from={'edit-template'} />
        </PageLayout>
    )
}

export default editTemplate; 