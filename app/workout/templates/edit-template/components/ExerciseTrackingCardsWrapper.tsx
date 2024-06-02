'use client'
import React, { useEffect } from 'react'
import { useTemplateExercises } from '@/app/contexts/workoutTemplateContext';
import { Exercise } from '@/app/workout/objects/classes';
import ExerciseTrackingCards from '@/app/workout/components/ExerciseTrackingCards';

interface Props {
    exercises: Exercise[];
}

const ExerciseTrackingCardsWrapper = ({ exercises }: Props) => {
    const { templateExercises, setTemplateExercises } = useTemplateExercises();

    // Load the exercises in the current template, if it has not been loaded already
    useEffect(() => {
        if (templateExercises.length === 0) {
            setTemplateExercises(exercises);
        }
    }, [])

    return (
        <>
            <ExerciseTrackingCards exercises={templateExercises} setExercises={setTemplateExercises} isTemplate={true} replaceExerciseRedirectURL='/workout/templates/edit-template/replace-exercise' />
        </>
    )
}

export default ExerciseTrackingCardsWrapper