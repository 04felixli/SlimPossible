'use client'
import { useExercisesToTrack } from '@/app/contexts/exercisesToTrackContext';
import { useReplacementExercise } from '@/app/contexts/replacementExerciseContext';
import { useSelectedExercises } from '@/app/contexts/selectedExercisesContext';
import Button from '@/app/global components/Buttons/Button'
import React from 'react'

interface Props {
    isAddButton: boolean; // If it is not an add button, it is a replace button
    exerciseToReplaceId?: number;
}

const AddOrReplaceButton = ({ isAddButton, exerciseToReplaceId }: Props) => {
    const { selectedExercises, setSelectedExercises } = useSelectedExercises();
    const { exercisesToTrack, setExercisesToTrack } = useExercisesToTrack();
    const { replacementExercise, setReplacementExercise } = useReplacementExercise();

    const handleAddExercises = () => {
        setExercisesToTrack([...exercisesToTrack, ...selectedExercises]);
        setSelectedExercises([]);
    }


    const handleReplaceExercise = () => {
        setExercisesToTrack(prevExercises => {
            return prevExercises.map(exercise => {
                if (exercise.id === exerciseToReplaceId && replacementExercise) {
                    return replacementExercise;
                }
                return exercise;
            });
        });
        setReplacementExercise(null);
    }

    if (isAddButton) {
        return (
            <>
                <Button text={`Add (${selectedExercises.length})`} onClickFunction={handleAddExercises} />
            </>
        )
    }

    return (
        <>
            <Button text={`Replace (${replacementExercise ? '1' : '0'})`} onClickFunction={handleReplaceExercise} />
        </>
    )

}

export default AddOrReplaceButton