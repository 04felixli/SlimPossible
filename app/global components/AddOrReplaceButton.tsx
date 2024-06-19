'use client'
import Button from '@/app/global components/Buttons/Button'
import React from 'react'
import { Workout } from '../workout/objects/classes';

interface Props {
    workout: Workout;
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    addExercises: () => void;
    replaceExercise: (exerciseToReplaceId?: number, insertionNumberOfExerciseToReplace?: number) => void
    isAddButton: boolean; // If it is not an add button, it is a replace button
    exerciseToReplaceId?: number;
    insertionNumberOfExerciseToReplace?: number;
}

const AddOrReplaceButton = ({ workout, setWorkout, addExercises, replaceExercise, isAddButton, exerciseToReplaceId, insertionNumberOfExerciseToReplace }: Props) => {

    if (isAddButton) {
        return (
            <>
                <Button text={`Add (${workout.exercisesToAdd.length})`} onClickFunction={addExercises} />
            </>
        )
    }

    return (
        <>
            <Button text={`Replace (${workout.replacementExercise ? '1' : '0'})`} onClickFunction={() => replaceExercise(exerciseToReplaceId, insertionNumberOfExerciseToReplace)} />
        </>
    )

}

export default AddOrReplaceButton