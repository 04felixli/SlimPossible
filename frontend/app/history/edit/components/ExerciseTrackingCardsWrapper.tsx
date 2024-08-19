'use client'
import { useHistory } from '@/app/contexts/historyContext';
import ExerciseTrackingCards from '@/app/global components/ExerciseTrackingCards';
import React from 'react';

const ExerciseTrackingCardsWrapper = () => {
    const { reOrderExercises, deleteSet, history, setHistory, addSet, removeExercise, changeWeightUnit, updateNotes, toggleNotes, toggleCompletedSet, changeWeightValue, changeRepsValue } = useHistory();
    return (
        <>
            <ExerciseTrackingCards
                workout={history}
                setWorkout={setHistory}
                addSet={addSet}
                removeExercise={removeExercise}
                changeWeightUnit={changeWeightUnit}
                updateNotes={updateNotes}
                toggleNotes={toggleNotes}
                toggleCompletedSet={toggleCompletedSet}
                changeWeightValue={changeWeightValue}
                changeRepsValue={changeRepsValue}
                isTemplate={false}
                replaceExerciseRedirectURL='/history/replace-exercise'
                deleteSet={deleteSet}
                reOrderExercises={reOrderExercises}
            />
        </>
    )
}

export default ExerciseTrackingCardsWrapper