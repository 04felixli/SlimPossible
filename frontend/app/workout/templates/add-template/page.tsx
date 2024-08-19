import React from 'react';
import PageLayout from '@/app/global components/PageLayouts/layout';
import PageName from '@/app/global components/PageName';
import WorkoutButtonsWrapper from '../components/WorkoutButtonsWrapper';
import ExerciseTrackingCardsWrapper from '../components/ExerciseTrackingCardsWrapper';
import RepopulateTemplate from '../components/RepopulateTemplate';
import AddTemplateName from './components/AddTemplateName';

const addTemplate = () => {
    return (
        <PageLayout activePage='/workout'>
            <RepopulateTemplate />
            <AddTemplateName />
            <ExerciseTrackingCardsWrapper from={'add-template'} />
            <WorkoutButtonsWrapper from={'add-template'} />
        </PageLayout>
    )
}

export default addTemplate