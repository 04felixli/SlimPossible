'use client'
import React from 'react'
import AddOrReplaceButton from '../../components/AddOrReplaceButton'
import { useWorkout } from '@/app/contexts/workoutContext';
import { useTemplate } from '@/app/contexts/templateContext';

interface Props {
  isAddButton: boolean;
  exerciseToReplaceId?: number;
  insertionNumberOfExerciseToReplace?: number;
}

const AddOrReplaceButtonWrapper = ({ isAddButton, exerciseToReplaceId, insertionNumberOfExerciseToReplace }: Props) => {
  const { template, setTemplate } = useTemplate();

  return (
    <AddOrReplaceButton workout={template} setWorkout={setTemplate} isAddButton={isAddButton} exerciseToReplaceId={exerciseToReplaceId} insertionNumberOfExerciseToReplace={insertionNumberOfExerciseToReplace} />
  )
}

export default AddOrReplaceButtonWrapper