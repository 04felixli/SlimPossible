'use client';
import React from 'react'
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import { useReplacementExercise } from '@/app/contexts/replacementExerciseContext';
import { useSelectedExercises } from '@/app/contexts/selectedExercisesContext';
import { Exercise } from '../objects/classes';

interface Props {
    exercises: ExerciseInList[];
    singleSelect: boolean; // true for replace exercise, false otherwise
}

const SelectableExerciseCard = ({ exercises, singleSelect }: Props) => {
    const { selectedExercises, setSelectedExercises } = useSelectedExercises();
    const { replacementExercise, setReplacementExercise } = useReplacementExercise();

    // Set selected exercises
    const handleMultipleSelect = (selectedExercise: ExerciseInList): void => {
        const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');
        const isSelected = selectedExercises.some(selected => selected.id === exercise.id);

        if (isSelected) {
            setSelectedExercises(selectedExercises.filter(selected => selected.id !== exercise.id));
        } else {
            setSelectedExercises([...selectedExercises, exercise]);
        }
    };

    // Set replacement exercises
    const handleSingleSelect = (selectedExercise: ExerciseInList): void => {
        const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');
        const isSelected = replacementExercise?.id === exercise.id ? true : false;

        if (isSelected) {
            setReplacementExercise(null);
        } else {
            setReplacementExercise(exercise);
        }
    };

    if (!singleSelect) {
        return (
            <div>
                <ul>
                    {exercises.map((exercise) => (
                        <li key={exercise.id}>
                            <div className={`card-bg ${selectedExercises.some(selectedExercise => selectedExercise.id === exercise.id) ? 'border' : ''}`} onClick={() => handleMultipleSelect(exercise)}>
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

    return (
        <div>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise.id}>
                        <div className={`card-bg ${replacementExercise?.id === exercise.id ? 'border' : ''}`} onClick={() => handleSingleSelect(exercise)}>
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

export default SelectableExerciseCard