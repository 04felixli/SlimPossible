'use client';
import React from 'react';
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import { Workout } from './objects/classes';

interface Props {
    workout: Workout;
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    multipleExerciseSelect: (selectedExercise: ExerciseInList) => void
    singleExerciseSelect: (selectedExercise: ExerciseInList) => void
    exercises: ExerciseInList[];
    singleSelect: boolean; // true for replace exercise, false otherwise
}

const SelectableExerciseCard = ({ workout, setWorkout, multipleExerciseSelect, singleExerciseSelect, exercises, singleSelect }: Props) => {

    if (!singleSelect) {
        return (
            <div>
                <ul>
                    {exercises.map((exercise) => (
                        <li key={exercise.id} className='hover:scale-[101%] duration-300 cursor-pointer'>
                            <div className={`card-bg ${workout.exercisesToAdd.some(selectedExercise => selectedExercise.id === exercise.id) ? 'border' : ''}`} onClick={() => multipleExerciseSelect(exercise)}>
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
                    <li key={exercise.id} className='hover:scale-[101%] duration-300 cursor-pointer'>
                        <div className={`card-bg ${workout.replacementExercise?.id === exercise.id ? 'border' : ''}`} onClick={() => singleExerciseSelect(exercise)}>
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