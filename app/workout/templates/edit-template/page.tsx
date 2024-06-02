import React from 'react'
import { GetWorkoutTemplateById } from '@/app/global components/Library/apiCalls';
import PageLayout from '@/app/global components/layout';
import PageName from '@/app/global components/PageName';
import DeleteTemplateButton from './components/DeleteTemplateButton';
import { Workout } from '../../objects/classes';
import ExerciseTrackingCardsWrapper from './components/ExerciseTrackingCardsWrapper';
import WorkoutButtonsWrapper from './components/WorkoutButtonsWrapper';

const editTemplate = async ({ searchParams }: {
    searchParams: {
        id: string;
    }
}) => {
    const templateId: number = parseInt(searchParams.id);
    const template: Workout = await GetWorkoutTemplateById(templateId);

    return (
        <PageLayout>
            <PageName name={template.name} />
            <ExerciseTrackingCardsWrapper exercises={JSON.parse(JSON.stringify(template.exercises))} />
            <WorkoutButtonsWrapper templateId={templateId} />
            <DeleteTemplateButton />
        </PageLayout>
    )
}

export default editTemplate