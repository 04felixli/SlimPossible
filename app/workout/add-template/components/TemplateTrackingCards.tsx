'use client'
import React from 'react'
import ExerciseTrackingCards from '../../components/ExerciseTrackingCards';
import { useTemplateExercises } from '@/app/contexts/workoutTemplateContext';

const TemplateTrackingCards = () => {
    const { templateExercises, setTemplateExercises } = useTemplateExercises();
    return (
        <>
            <ExerciseTrackingCards exercises={templateExercises} setExercises={setTemplateExercises} isTemplate={true} replaceExerciseRedirectURL='/workout/add-template/replaceExercise' />
        </>
    )
}

export default TemplateTrackingCards