'use client';
import React from 'react'
import { useSelectedExercises } from '../../../../contexts/selectedExercisesContext';
import { Exercise } from '../../../objects/classes';
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';

interface Props {
    exercises: ExerciseInList[];
}

const SelectableExerciseCard = (props: Props) => {
    const { selectedExercises, setSelectedExercises } = useSelectedExercises();

    const handleExerciseSelection = (selectedExercise: ExerciseInList): void => {
        const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');
        const isSelected = selectedExercises.some(selected => selected.id === exercise.id);

        if (isSelected) {
            setSelectedExercises(selectedExercises.filter(selected => selected.id !== exercise.id));
        } else {
            setSelectedExercises([...selectedExercises, exercise]);
        }
    };

    return (
        <div>
            <ul>
                {props.exercises.map((exercise) => (
                    <li key={exercise.id}>
                        <div className={`card-bg ${selectedExercises.some(selectedExercise => selectedExercise.id === exercise.id) ? 'border' : ''}`} onClick={() => handleExerciseSelection(exercise)}>
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