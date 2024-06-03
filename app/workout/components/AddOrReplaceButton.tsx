'use client'
import Button from '@/app/global components/Buttons/Button'
import React from 'react'
import { Workout } from '../objects/classes';

interface Props {
    workout: Workout;
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    isAddButton: boolean; // If it is not an add button, it is a replace button
    exerciseToReplaceId?: number;
    insertionNumberOfExerciseToReplace?: number;
}

const AddOrReplaceButton = ({ workout, setWorkout, isAddButton, exerciseToReplaceId, insertionNumberOfExerciseToReplace }: Props) => {
    const handleAddExercises = () => {
        setWorkout(prevWorkout => {
            // Update each exercises insertion number
            const processedExercisesToAdd = prevWorkout.exercisesToAdd.map((exercise, index) => {
                const newInsertionNumber = prevWorkout.totalNumExercisesAddedEver + index
                return { ...exercise, insertionNumber: newInsertionNumber }
            })

            // 1. Update workout.exercises
            // 2. Clear workout.exercisesToAdd
            // 3. Increment workout.totalNumExercisesAddedEver by the number of workouts added
            return { ...prevWorkout, exercises: [...prevWorkout.exercises, ...processedExercisesToAdd], exercisesToAdd: [], totalNumExercisesAddedEver: prevWorkout.totalNumExercisesAddedEver + processedExercisesToAdd.length }
        })
    }

    const handleReplaceExercise = () => {
        setWorkout(prevWorkout => {
            // Update the exercise to replace with workout.replacementExercise
            const updatedExercises = prevWorkout.exercises.map(exercise => {
                if (exercise.id === exerciseToReplaceId && exercise.insertionNumber === insertionNumberOfExerciseToReplace && prevWorkout.replacementExercise) {
                    const replacementExercise = { ...prevWorkout.replacementExercise, insertionNumber: insertionNumberOfExerciseToReplace }

                    return replacementExercise
                }

                return exercise
            })

            // 1. Update workout.exercises 
            // 2. Clear workout.replacementExercise
            return { ...prevWorkout, exercises: updatedExercises, replacementExercise: undefined }
        })
    }

    if (isAddButton) {
        return (
            <>
                <Button text={`Add (${workout.exercisesToAdd.length})`} onClickFunction={handleAddExercises} />
            </>
        )
    }

    return (
        <>
            <Button text={`Replace (${workout.replacementExercise ? '1' : '0'})`} onClickFunction={handleReplaceExercise} />
        </>
    )

}

export default AddOrReplaceButton