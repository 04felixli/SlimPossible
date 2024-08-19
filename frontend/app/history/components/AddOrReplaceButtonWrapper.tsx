'use client'
import React from 'react';
import { useHistory } from '@/app/contexts/historyContext';
import AddOrReplaceButton from '@/app/global components/AddOrReplaceButton';

interface Props {
    isAddButton: boolean;
    exerciseToReplaceId?: number;
    insertionNumberOfExerciseToReplace?: number;
}

const AddOrReplaceButtonWrapper = ({ isAddButton, exerciseToReplaceId, insertionNumberOfExerciseToReplace }: Props) => {
    const { history, setHistory, addExercises, replaceExercise } = useHistory();

    return (
        <AddOrReplaceButton workout={history} setWorkout={setHistory} addExercises={addExercises} replaceExercise={replaceExercise} isAddButton={isAddButton} exerciseToReplaceId={exerciseToReplaceId} insertionNumberOfExerciseToReplace={insertionNumberOfExerciseToReplace} />
    )
}

export default AddOrReplaceButtonWrapper