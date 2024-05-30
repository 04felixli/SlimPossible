'use client'
import { useExercisesToTrack } from '@/app/contexts/exercisesToTrackContext';
import React from 'react'
import ExerciseTrackingCards from '../../components/ExerciseTrackingCards';

const WorkoutTrackingCards = () => {
    const { exercisesToTrack, setExercisesToTrack } = useExercisesToTrack();
    return (
        <>
            <ExerciseTrackingCards exercises={exercisesToTrack} setExercises={setExercisesToTrack} isTemplate={false} replaceExerciseRedirectURL='/workout/start/replaceExercise' />
        </>
    )
}

export default WorkoutTrackingCards