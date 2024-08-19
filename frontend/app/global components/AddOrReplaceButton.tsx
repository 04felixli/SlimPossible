'use client'
import Button from '@/app/global components/Buttons/Button';
import React from 'react';
import { Workout } from './objects/classes';

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
                <div className='black-button'>
                    <Button text={`Add (${workout.exercisesToAdd.length})`} onClickFunction={addExercises} className='max-sm:w-full' />
                </div>
            </>
        )
    }

    return (
        <>
            <div className='black-button'>
                <Button className='max-sm:w-full' text={`Replace (${workout.replacementExercise ? '1' : '0'})`} onClickFunction={() => replaceExercise(exerciseToReplaceId, insertionNumberOfExerciseToReplace)} />
            </div>
        </>
    )

}

export default AddOrReplaceButton