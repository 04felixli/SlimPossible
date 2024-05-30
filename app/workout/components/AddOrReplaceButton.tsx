'use client'
import { useExercisesToTrack } from '@/app/contexts/exercisesToTrackContext';
import { useReplacementExercise } from '@/app/contexts/replacementExerciseContext';
import { useSelectedExercises } from '@/app/contexts/selectedExercisesContext';
import Button from '@/app/global components/Buttons/Button'
import React from 'react'
import { Exercise } from '../objects/classes';

interface Props {
    exercises: Exercise[];
    setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
    isAddButton: boolean; // If it is not an add button, it is a replace button
    exerciseToReplaceId?: number;
}

const AddOrReplaceButton = ({ exercises, setExercises, isAddButton, exerciseToReplaceId }: Props) => {
    const { selectedExercises, setSelectedExercises } = useSelectedExercises();
    const { replacementExercise, setReplacementExercise } = useReplacementExercise();

    const handleAddExercises = () => {
        setExercises([...exercises, ...selectedExercises]);
        setSelectedExercises([]);
    }


    const handleReplaceExercise = () => {
        setExercises(prevExercises => {
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