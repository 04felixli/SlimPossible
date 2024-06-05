'use client'
import React from 'react'
import ExerciseTrackingCards from '@/app/workout/components/ExerciseTrackingCards';
import { useTemplate } from '@/app/contexts/templateContext';

const ExerciseTrackingCardsWrapper = () => {
    const { template, setTemplate } = useTemplate();
    return (
        <>
            <ExerciseTrackingCards workout={template} setWorkout={setTemplate} isTemplate={true} replaceExerciseRedirectURL='/workout/templates/add-template/replaceExercise' />
        </>
    )
}

export default ExerciseTrackingCardsWrapper