'use client'
import React from 'react'
import ExerciseTrackingCards from '../../../global components/ExerciseTrackingCards';
import { useWorkout } from '@/app/contexts/workoutContext';

const WorkoutTrackingCards = () => {
    const { workout, setWorkout } = useWorkout();
    return (
        <>
            <ExerciseTrackingCards workout={workout} setWorkout={setWorkout} isTemplate={false} replaceExerciseRedirectURL='/workout/start/replaceExercise' />
        </>
    )
}

export default WorkoutTrackingCards