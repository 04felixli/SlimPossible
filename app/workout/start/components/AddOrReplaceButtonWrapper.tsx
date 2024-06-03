'use client'
import React from 'react'
import AddOrReplaceButton from '../../components/AddOrReplaceButton'
import { useWorkout } from '@/app/contexts/workoutContext';

interface Props {
    isAddButton: boolean;
    exerciseToReplaceId?: number;
    insertionNumberOfExerciseToReplace?: number;
}

const AddOrReplaceButtonWrapper = ({ isAddButton, exerciseToReplaceId, insertionNumberOfExerciseToReplace }: Props) => {
    const { workout, setWorkout } = useWorkout();

    return (
        <AddOrReplaceButton workout={workout} setWorkout={setWorkout} isAddButton={isAddButton} exerciseToReplaceId={exerciseToReplaceId} insertionNumberOfExerciseToReplace={insertionNumberOfExerciseToReplace} />
    )
}

export default AddOrReplaceButtonWrapper