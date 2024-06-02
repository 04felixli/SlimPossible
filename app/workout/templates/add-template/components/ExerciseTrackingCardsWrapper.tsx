'use client'
import React from 'react'
import { useTemplateExercises } from '@/app/contexts/workoutTemplateContext';
import ExerciseTrackingCards from '@/app/workout/components/ExerciseTrackingCards';

const ExerciseTrackingCardsWrapper = () => {
    const { templateExercises, setTemplateExercises } = useTemplateExercises();
    return (
        <>
            <ExerciseTrackingCards exercises={templateExercises} setExercises={setTemplateExercises} isTemplate={true} replaceExerciseRedirectURL='/workout/templates/add-template/replaceExercise' />
        </>
    )
}

export default ExerciseTrackingCardsWrapper