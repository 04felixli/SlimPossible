'use client'
import React, { useEffect } from 'react'
import { Exercise } from '@/app/workout/objects/classes';
import ExerciseTrackingCards from '@/app/workout/components/ExerciseTrackingCards';
import { useTemplate } from '@/app/contexts/templateContext';

interface Props {
    exercises: Exercise[];
}

const ExerciseTrackingCardsWrapper = ({ exercises }: Props) => {
    const { template, setTemplate } = useTemplate();

    // Load the exercises in the current template, if it has not been loaded already
    useEffect(() => {
        setTemplate(prevTemplate => {
            return { ...prevTemplate, exercises: exercises };
        })
    }, [])

    return (
        <>
            <ExerciseTrackingCards workout={template} setWorkout={setTemplate} isTemplate={true} replaceExerciseRedirectURL='/workout/templates/edit-template/replace-exercise' />
        </>
    )
}

export default ExerciseTrackingCardsWrapper