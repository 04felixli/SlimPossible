'use client'
import React from 'react'
import { useTemplateExercises } from '@/app/contexts/workoutTemplateContext';
import AddOrReplaceButton from '@/app/workout/components/AddOrReplaceButton';

interface Props {
  isAddButton: boolean;
  exerciseToReplaceId?: number;
}

const AddOrReplaceButtonWrapper = ({ isAddButton, exerciseToReplaceId }: Props) => {
  const { templateExercises, setTemplateExercises } = useTemplateExercises();

  return (
    <AddOrReplaceButton exercises={templateExercises} setExercises={setTemplateExercises} isAddButton={isAddButton} exerciseToReplaceId={exerciseToReplaceId} />
  )
}

export default AddOrReplaceButtonWrapper