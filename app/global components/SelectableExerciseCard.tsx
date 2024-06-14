'use client';
import React from 'react'
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import { Exercise, Workout } from '../workout/objects/classes';
import { useWorkout } from '@/app/contexts/workoutContext';

interface Props {
    workout: Workout;
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    exercises: ExerciseInList[];
    singleSelect: boolean; // true for replace exercise, false otherwise
}

const SelectableExerciseCard = ({ workout, setWorkout, exercises, singleSelect }: Props) => {
    // const { workout, setWorkout } = useWorkout();

    // Set selected exercises
    const handleMultipleSelect = (selectedExercise: ExerciseInList): void => {
        // Create a new exercise object from selectedExercise
        const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');

        // Check if the exercise is already selected
        const isSelected = workout.exercisesToAdd.some(selected => selected.id === exercise.id);

        if (isSelected) {
            // Remove the exercise if it's already selected
            const updatedExercises = workout.exercisesToAdd.filter(selected => selected.id !== exercise.id);
            setWorkout({ ...workout, exercisesToAdd: updatedExercises });
        } else {
            // Add the exercise if it's not already selected
            const updatedExercises = [...workout.exercisesToAdd, exercise];
            setWorkout({ ...workout, exercisesToAdd: updatedExercises });
        }
    };

    // Set replacement exercise
    const handleSingleSelect = (selectedExercise: ExerciseInList): void => {
        const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');
        const isSelected = workout.replacementExercise?.id === exercise.id ? true : false;

        if (isSelected) {
            setWorkout({ ...workout, replacementExercise: undefined });
        } else {
            const exercise = new Exercise(selectedExercise.id, selectedExercise.name, selectedExercise.equipment, selectedExercise.targetMuscle, 'lbs');
            setWorkout({ ...workout, replacementExercise: exercise });
        }
    };

    if (!singleSelect) {
        return (
            <div>
                <ul>
                    {exercises.map((exercise) => (
                        <li key={exercise.id}>
                            <div className={`card-bg ${workout.exercisesToAdd.some(selectedExercise => selectedExercise.id === exercise.id) ? 'border' : ''}`} onClick={() => handleMultipleSelect(exercise)}>
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
                        <div className={`card-bg ${workout.replacementExercise?.id === exercise.id ? 'border' : ''}`} onClick={() => handleSingleSelect(exercise)}>
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