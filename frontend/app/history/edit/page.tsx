import PageLayout from '@/app/global components/PageLayouts/layout';
import React from 'react';
import WorkoutHistoryName from './components/WorkoutHistoryName';
import ExerciseTrackingCardsWrapper from './components/ExerciseTrackingCardsWrapper';
import WorkoutButtonsWrapper from './components/WorkoutButtonsWrapper';
import WorkoutHistorySubInfo from './components/WorkoutHistorySubInfo';
import RepopulateHistory from './components/RepopulateHistory';

const editHistory = () => {
    return (
        <PageLayout activePage='/history'>
            <RepopulateHistory />
            <WorkoutHistoryName />
            <WorkoutHistorySubInfo />
            <ExerciseTrackingCardsWrapper />
            <WorkoutButtonsWrapper />
        </PageLayout>
    )
}

export default editHistory