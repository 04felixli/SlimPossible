'use client'
import React from 'react'
import { FaCheck } from "react-icons/fa";
import { useExercisesToTrack } from '@/app/contexts/exercisesToTrackContext';
import { Exercise } from '../objects/classes';
import NumericInput from './NumericInput';

interface Props {
    exercise: Exercise; // The actual exercise we are rendering sets from
    exercises: Exercise[]; // List of all exercises in a workout template, workout, or workout history 
    setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
    isTemplate: boolean; // Sets are not completeable for templates, but are completeable for normal tracking and edit history
}

const TrackSets = ({ exercise, exercises, setExercises, isTemplate }: Props) => {

    const handleCompletedSet = (exerciseId: number, setNumber: number) => {
        setExercises(prevExercises => {
            return prevExercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    const updatedSets = exercise.sets.map(set => {
                        if (set.setNumber === setNumber) {
                            return { ...set, isCompleted: !set.isCompleted };
                        }
                        return set;
                    });
                    return { ...exercise, sets: updatedSets };
                }
                return exercise;
            });
        });
    }

    const handleWeightInput = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number) => {
        const newWeight = event.target.value ? parseFloat(event.target.value) : -1;
        setExercises(prevExercises => {
            return prevExercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    const updatedSets = exercise.sets.map(set => {
                        if (set.setNumber === setNumber && newWeight !== -1) {
                            return { ...set, weight: newWeight };
                        } else if (set.setNumber === setNumber && newWeight === -1) {
                            return { ...set, weight: newWeight, isCompleted: false };
                        }
                        return set;
                    });
                    return { ...exercise, sets: updatedSets };
                }
                return exercise;
            });
        });
    };

    const handleRepInput = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number) => {
        const newReps = event.target.value ? parseInt(event.target.value, 10) : -1;
        setExercises(prevExercises => {
            return prevExercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    const updatedSets = exercise.sets.map(set => {
                        if (set.setNumber === setNumber && newReps !== -1) {
                            return { ...set, reps: newReps };
                        } else if (set.setNumber === setNumber && newReps === -1) {
                            return { ...set, reps: newReps, isCompleted: false };
                        }
                        return set;
                    });
                    return { ...exercise, sets: updatedSets };
                }
                return exercise;
            });
        });
    };

    const preventInvalidInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const validKeys = [
            'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'
        ];
        if (
            !validKeys.includes(event.key) && // Allow control keys
            !(event.key >= '0' && event.key <= '9') // Allow digits 0-9
        ) {
            event.preventDefault();
        }
    };

    return (
        <div>
            <ul>
                {exercise.sets.map((set) => (
                    <li key={set.setNumber}>
                        <div className={`flex flex-row justify-between items-center rounded-sm py-1`}>
                            {/* Set number */}
                            <div className='flex flex-col'>
                                {set.setNumber == 1 && <div className='mb-2 flex justify-center'>Set</div>}
                                <div className={`px-2 rounded-full border ${set.isCompleted ? 'border-disabled-color text-disabled-color' : ''}`}>{set.setNumber}</div>
                            </div>

                            {/* Previous */}
                            <div className='flex flex-col'>
                                {set.setNumber == 1 && <div className='mb-2 flex justify-center'>Previous</div>}
                                <div className={`thin-font ${set.isCompleted ? '' : ''}`}>210 {exercise.weightUnit} * 10</div>
                            </div>

                            {/* input field for weight */}
                            <div className='flex flex-col w-2/12'>
                                {set.setNumber == 1 && <div className='mb-2 flex justify-center'>{exercise.weightUnit}</div>}
                                <div className='flex justify-center'>
                                    <NumericInput
                                        name="Weight Input"
                                        value={set.weight < 0 ? '' : set.weight}
                                        onChange={(e) => handleWeightInput(e, exercise.id, set.setNumber)}
                                        onKeyDown={preventInvalidInput} // Prevent '-' character
                                        className={`max-w-xs bg-card-bg-gradient-dark rounded-full py-1 px-2 h-full w-full ${set.isCompleted ? 'text-disabled-color' : ''}`}
                                    />
                                </div>
                            </div>

                            {/* input field for reps */}
                            <div className='flex flex-col w-2/12'>
                                {set.setNumber == 1 && <div className='mb-2 flex justify-center'>Reps</div>}
                                <div className='flex justify-center'>
                                    <NumericInput
                                        name="Rep Input"
                                        value={set.reps < 0 ? '' : set.reps}
                                        onChange={(e) => handleRepInput(e, exercise.id, set.setNumber)}
                                        onKeyDown={preventInvalidInput} // Prevent '-' character
                                        className={`max-w-xs bg-card-bg-gradient-dark rounded-full py-1 h-full w-full ${set.isCompleted ? 'text-disabled-color' : ''}`}
                                    />
                                </div>
                            </div>

                            {/* complete set button - Not rendered for templates */}
                            {!isTemplate && <div className='flex flex-col'>
                                {set.setNumber == 1 && <div className='mb-2 flex justify-center p-1 rounded-full'><FaCheck /></div>}
                                <button className={`p-1 rounded-full ${set.isCompleted ? 'bg-green-500 border border-green-500' : 'border'}`}
                                    onClick={() => handleCompletedSet(exercise.id, set.setNumber)}
                                    disabled={(set.reps < 0 || set.weight < 0) ? true : false}
                                >
                                    <FaCheck />
                                </button>
                            </div>}
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default TrackSets