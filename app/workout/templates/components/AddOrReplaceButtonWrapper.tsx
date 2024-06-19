'use client'
import React from 'react'
import AddOrReplaceButton from '../../../global components/AddOrReplaceButton'
import { useWorkout } from '@/app/contexts/workoutContext';
import { useTemplate } from '@/app/contexts/templateContext';

interface Props {
  isAddButton: boolean;
  exerciseToReplaceId?: number;
  insertionNumberOfExerciseToReplace?: number;
}

const AddOrReplaceButtonWrapper = ({ isAddButton, exerciseToReplaceId, insertionNumberOfExerciseToReplace }: Props) => {
  const { template, setTemplate, addExercises, replaceExercise } = useTemplate();

  return (
    <AddOrReplaceButton workout={template} setWorkout={setTemplate} addExercises={addExercises} replaceExercise={replaceExercise} isAddButton={isAddButton} exerciseToReplaceId={exerciseToReplaceId} insertionNumberOfExerciseToReplace={insertionNumberOfExerciseToReplace} />
  )
}


export default AddOrReplaceButtonWrapper