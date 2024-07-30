'use client'
import React from 'react'
import ExerciseTrackingCards from '../../../global components/ExerciseTrackingCards';
import { useWorkout } from '@/app/contexts/workoutContext';

const WorkoutTrackingCards = () => {
    const { deleteSet, workout, setWorkout, addSet, removeExercise, changeWeightUnit, updateNotes, toggleNotes, toggleCompletedSet, changeWeightValue, changeRepsValue } = useWorkout();
    return (
        <>
            <ExerciseTrackingCards
                workout={workout}
                setWorkout={setWorkout}
                addSet={addSet}
                removeExercise={removeExercise}
                changeWeightUnit={changeWeightUnit}
                updateNotes={updateNotes}
                toggleNotes={toggleNotes}
                toggleCompletedSet={toggleCompletedSet}
                changeWeightValue={changeWeightValue}
                changeRepsValue={changeRepsValue}
                isTemplate={false}
                replaceExerciseRedirectURL='/workout/start/replaceExercise'
                deleteSet={deleteSet}
            />
        </>
    )
}

export default WorkoutTrackingCards