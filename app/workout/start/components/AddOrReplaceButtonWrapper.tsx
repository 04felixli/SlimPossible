'use client'
import React from 'react'
import AddOrReplaceButton from '../../components/AddOrReplaceButton'
import { useExercisesToTrack } from '@/app/contexts/exercisesToTrackContext';

interface Props {
    isAddButton: boolean;
    exerciseToReplaceId?: number;
}

const AddOrReplaceButtonWrapper = ({ isAddButton, exerciseToReplaceId }: Props) => {
    const { exercisesToTrack, setExercisesToTrack } = useExercisesToTrack();

    return (
        <AddOrReplaceButton exercises={exercisesToTrack} setExercises={setExercisesToTrack} isAddButton={isAddButton} exerciseToReplaceId={exerciseToReplaceId} />
    )
}

export default AddOrReplaceButtonWrapper