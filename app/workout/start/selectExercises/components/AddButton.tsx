'use client'
import Button from '@/app/global components/Buttons/Button'
import React from 'react'
import { useSelectedExercises } from '../../../../contexts/selectedExercisesContext';
import { useExercisesToTrack } from '../../../../contexts/exercisesToTrackContext';

const AddButton = () => {
    const { selectedExercises, setSelectedExercises } = useSelectedExercises();
    const { exercisesToTrack, setExercisesToTrack } = useExercisesToTrack();

    const handleAddSelectedExercises = () => {
        setExercisesToTrack([...exercisesToTrack, ...selectedExercises]);
        setSelectedExercises([]);
    }

    return (
        <>
            <Button text={`Add (${selectedExercises.length})`} onClickFunction={handleAddSelectedExercises} />
        </>
    )
}

export default AddButton