'use client';
import React, { ReactNode } from 'react';
import { TbSwitch3 } from "react-icons/tb";
import { FaNoteSticky } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';
import { Exercise, WorkoutSet } from '../objects/classes';
import ActionButton from './ActionButton';
import TrackSets from './TrackSets';

interface Props {
    exercises: Exercise[];
    setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>
    isTemplate: boolean;
    replaceExerciseRedirectURL: string;
}

const ExerciseTrackingCards = ({ exercises, setExercises, isTemplate, replaceExerciseRedirectURL }: Props) => {

    const handleAddSet = (exerciseId: number) => {
        setExercises(prevExercises => {
            return prevExercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    const newSet = new WorkoutSet(exercise.sets.length + 1);
                    const updatedSets = [...exercise.sets, { ...newSet, setNumber: exercise.sets.length + 1 }];
                    return { ...exercise, sets: updatedSets };
                }
                return exercise;
            });
        });
    }

    const handleRemoveExercise = (exerciseId: number) => {
        setExercises(prevExercises => {
            return prevExercises.filter(exercise => exercise.id !== exerciseId);
        });
    }

    const handleWeightUnitChange = (exerciseId: number) => {
        setExercises(prevExercises => {
            return prevExercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    return { ...exercise, weightUnit: exercise.weightUnit === 'lbs' ? 'kgs' : 'lbs' };
                }
                return exercise;
            });
        });
    }

    const handleNotesChange = (exerciseId: number, value: string): void => {
        setExercises((prevExercises) => {
            return prevExercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    return { ...exercise, notes: value };
                }
                return exercise;
            });
        });
    }

    const toggleNotes = (exerciseId: number): void => {
        setExercises((prevExercises) => {
            return prevExercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    return { ...exercise, showNotes: !exercise.showNotes };
                }
                return exercise;
            });
        });
    }

    return (
        <div>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise.id} className='card-bg'>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='items-center card-title-font'>{exercise.name}</div>

                            {/* Remove exercise button */}
                            <ActionButton isRemoveExercise={true} onClickFunction={() => handleRemoveExercise(exercise.id)}>
                                <RiDeleteBin2Fill />
                            </ActionButton>
                        </div>
                        <div className='flex justify-between thin-font'>
                            <div>{exercise.equipment}</div>
                            <div>{exercise.targetMuscle}</div>
                        </div>

                        {/* Input field for notes */}
                        {exercise.showNotes && <div>
                            <textarea
                                id={`notes_${exercise.id}`}
                                value={exercise.notes ? exercise.notes : ''}
                                onChange={(e) => {
                                    handleNotesChange(exercise.id, e.target.value);
                                    e.target.style.height = 'auto'; // Reset height to auto
                                    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
                                }}
                                className="focus:outline-none bg-transparent border-b w-full mt-2 resize-none overflow-hidden min-h-8 h-auto text-sm"
                                placeholder={exercise.notes ? exercise.notes : 'Add Notes'}
                            />
                        </div>}

                        {/* Component for actual set tracking */}
                        <TrackSets exercise={exercise} exercises={exercises} setExercises={setExercises} isTemplate={isTemplate} />
                        <div className='flex flex-row justify-between items-center mt-5'>

                            {/* Replace exercise button */}
                            <Link href={`${replaceExerciseRedirectURL}?id=${exercise.id}`}>
                                <ActionButton>
                                    <TbSwitch3 />
                                </ActionButton>
                            </Link>

                            {/* Show/hide notes for exercise button */}
                            <ActionButton onClickFunction={() => toggleNotes(exercise.id)}>
                                <FaNoteSticky />
                            </ActionButton>

                            {/* Change weight unit for exercise button */}
                            <ActionButton onClickFunction={() => handleWeightUnitChange(exercise.id)}>
                                <span className='text-xs'>{exercise.weightUnit === 'lbs' ? 'kgs' : 'lbs'}</span>
                            </ActionButton>

                            {/* Add set button */}
                            <ActionButton onClickFunction={() => handleAddSet(exercise.id)}>
                                <FaPlus />
                            </ActionButton>

                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default ExerciseTrackingCards