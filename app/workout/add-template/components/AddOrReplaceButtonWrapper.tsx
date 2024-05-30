'use client'
import React from 'react'
import AddOrReplaceButton from '../../components/AddOrReplaceButton'
import { useTemplateExercises } from '@/app/contexts/workoutTemplateContext';

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