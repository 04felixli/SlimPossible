'use client'
import Button from '@/app/global components/Buttons/Button'
import React from 'react'
import { useExercisesToTrack } from '../../../../contexts/exercisesToTrackContext';
import { Exercise } from '../../objects/classes';
import { useReplacementExercise } from '@/app/contexts/replacementExerciseContext';

interface Props {
    exerciseToReplaceId: number;
}

const ReplaceButton = ({ exerciseToReplaceId }: Props) => {
    const { replacementExercise, setReplacementExercise } = useReplacementExercise();
    const { exercisesToTrack, setExercisesToTrack } = useExercisesToTrack();

    const handleAddSelectedExercises = () => {
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

    return (
        <>
            <Button text={`Replace (${replacementExercise ? '1' : '0'})`} onClickFunction={handleAddSelectedExercises} />
        </>
    )
}

export default ReplaceButton