'use client'
import React from 'react'
import { FaCheck } from "react-icons/fa";
import { Exercise, Workout } from '../objects/classes';
import NumericInput from './NumericInput';

interface Props {
    toggleCompletedSet: (exerciseId: number, setNumber: number, insertionNumber: number) => void,
    changeWeightValue: (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => void;
    changeRepsValue: (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => void;
    exercise: Exercise; // The actual exercise we are rendering sets from
    isTemplate: boolean; // Sets are not completeable for templates, but are completeable for normal tracking and edit history
}

const TrackSets = ({ toggleCompletedSet, changeWeightValue, changeRepsValue, exercise, isTemplate }: Props) => {
    const insertionNumber = exercise.insertionNumber;

    const preventInvalidInput = (event: React.KeyboardEvent<HTMLInputElement>, fieldType: string) => {
        const validKeysForWeight = [
            'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', '.'
        ];

        const validKeysForReps = [
            'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'
        ];

        // Allow Ctrl/Cmd key combinations
        if (event.ctrlKey || event.metaKey) {
            return;
        }

        const validKeys = fieldType === 'weight' ? validKeysForWeight : validKeysForReps;

        if (
            !validKeys.includes(event.key) && // Allow control keys
            !(event.key >= '0' && event.key <= '9') // Allow digits 0-9
        ) {
            event.preventDefault();
        }

        // Additional check to prevent multiple decimal points for weight input
        if (fieldType === 'weight' && event.key === '.' && event.currentTarget.value.includes('.')) {
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
                                        onChange={(e) => changeWeightValue(e, exercise.id, set.setNumber, insertionNumber)}
                                        onKeyDown={(e) => preventInvalidInput(e, "weight")} // Prevent invalid character input
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
                                        onChange={(e) => changeRepsValue(e, exercise.id, set.setNumber, insertionNumber)}
                                        onKeyDown={(e) => preventInvalidInput(e, "reps")} // Prevent invalid character input
                                        className={`max-w-xs bg-card-bg-gradient-dark rounded-full py-1 h-full w-full ${set.isCompleted ? 'text-disabled-color' : ''}`}
                                    />
                                </div>
                            </div>

                            {/* complete set button - Not rendered for templates */}
                            {!isTemplate && <div className='flex flex-col'>
                                {set.setNumber == 1 && <div className='mb-2 flex justify-center p-1 rounded-full'><FaCheck /></div>}
                                <button className={`p-1 rounded-full ${set.isCompleted ? 'bg-green-500 border border-green-500' : 'border'}`}
                                    onClick={() => toggleCompletedSet(exercise.id, set.setNumber, insertionNumber)}
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