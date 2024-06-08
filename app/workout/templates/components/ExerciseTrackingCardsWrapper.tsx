'use client'
import React from 'react'
import ExerciseTrackingCards from '@/app/workout/components/ExerciseTrackingCards';
import { useTemplate } from '@/app/contexts/templateContext';

interface Props {
    from: string;
}

const ExerciseTrackingCardsWrapper = ({ from }: Props) => {
    const { template, setTemplate } = useTemplate();
    return (
        <>
            <ExerciseTrackingCards workout={template} setWorkout={setTemplate} isTemplate={true} replaceExerciseRedirectURL='/workout/templates/replaceExercise' from={from} />
        </>
    )
}

export default ExerciseTrackingCardsWrapper