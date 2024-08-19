import React from 'react';
import PageLayout from '@/app/global components/PageLayouts/layout';
import WorkoutTrackingCards from './components/WorkoutTrackingCards';
import WorkoutButtonsWrapper from './components/WorkoutButtonsWrapper';
import Timer from './components/Timer';
import StartWorkoutName from './components/StartWorkoutName';

const start = () => {
    return (
        <PageLayout activePage='/workout'>
            <StartWorkoutName />
            <Timer />
            <WorkoutTrackingCards />
            <WorkoutButtonsWrapper />
        </PageLayout>
    )
}

export default start