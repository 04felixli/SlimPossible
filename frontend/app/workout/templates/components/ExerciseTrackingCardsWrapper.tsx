'use client'
import React from 'react';
import { useTemplate } from '@/app/contexts/templateContext';
import ExerciseTrackingCards from '@/app/global components/ExerciseTrackingCards';

interface Props {
    from: string;
}

const ExerciseTrackingCardsWrapper = ({ from }: Props) => {
    const { reOrderExercises, deleteSet, template, setTemplate, addSet, removeExercise, changeWeightUnit, updateNotes, toggleNotes, toggleCompletedSet, changeWeightValue, changeRepsValue } = useTemplate();
    return (
        <>
            <ExerciseTrackingCards
                workout={template}
                setWorkout={setTemplate}
                addSet={addSet}
                removeExercise={removeExercise}
                changeWeightUnit={changeWeightUnit}
                updateNotes={updateNotes}
                toggleNotes={toggleNotes}
                toggleCompletedSet={toggleCompletedSet}
                changeWeightValue={changeWeightValue}
                changeRepsValue={changeRepsValue}
                isTemplate={true}
                replaceExerciseRedirectURL='/workout/templates/replaceExercise'
                from={from}
                deleteSet={deleteSet}
                reOrderExercises={reOrderExercises}
            />
        </>
    )
}

export default ExerciseTrackingCardsWrapper