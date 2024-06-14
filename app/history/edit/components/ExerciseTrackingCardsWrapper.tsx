'use client'
import { useHistory } from '@/app/contexts/historyContext';
import ExerciseTrackingCards from '@/app/global components/ExerciseTrackingCards';
import React from 'react'

const ExerciseTrackingCardsWrapper = () => {
    const { history, setHistory } = useHistory();
    return (
        <>
            <ExerciseTrackingCards workout={history} setWorkout={setHistory} isTemplate={false} replaceExerciseRedirectURL='/history/replace-exercise' />
        </>
    )
}

export default ExerciseTrackingCardsWrapper