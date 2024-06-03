'use client'
import { useExercisesToTrack } from '@/app/contexts/exercisesToTrackContext';
import React from 'react'
import ExerciseTrackingCards from '../../components/ExerciseTrackingCards';
import { useWorkout } from '@/app/contexts/workoutContext';

const WorkoutTrackingCards = () => {
    const { exercisesToTrack, setExercisesToTrack } = useExercisesToTrack();
    const { workout, setWorkout } = useWorkout();
    return (
        <>
            <ExerciseTrackingCards workout={workout} setWorkout={setWorkout} exercises={exercisesToTrack} setExercises={setExercisesToTrack} isTemplate={false} replaceExerciseRedirectURL='/workout/start/replaceExercise' />
        </>
    )
}

export default WorkoutTrackingCards