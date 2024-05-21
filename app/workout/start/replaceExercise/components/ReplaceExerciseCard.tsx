'use client';
import React, { useState } from 'react'
import { useSelectedExercises } from '../../../../contexts/selectedExercisesContext';
import { Exercise } from '../../objects/classes';
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import { useReplacementExercise } from '@/app/contexts/replacementExerciseContext';

interface Props {
    exercises: ExerciseInList[];
}

const ReplaceExerciseCard = (props: Props) => {
    const { replacementExercise, setReplacementExercise } = useReplacementExercise();

    const handleExerciseSelection = (selectedExercise: ExerciseInList): void => {
        const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');
        const isSelected = replacementExercise?.id === exercise.id ? true : false;

        if (isSelected) {
            setReplacementExercise(null);
        } else {
            setReplacementExercise(exercise);
        }
    };

    return (
        <div>
            <ul>
                {props.exercises.map((exercise) => (
                    <li key={exercise.id}>
                        <div className={`card-bg ${replacementExercise?.id === exercise.id ? 'border' : ''}`} onClick={() => handleExerciseSelection(exercise)}>
                            <div className='items-center card-title-font'>{exercise.name}</div>
                            <div className='flex justify-between font-thin text-sm'>
                                <div>{exercise.equipment}</div>
                                <div>{exercise.targetMuscle}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ReplaceExerciseCard