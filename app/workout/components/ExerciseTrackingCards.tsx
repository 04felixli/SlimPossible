'use client';
import React, { useState } from 'react';
import { TbSwitch3 } from "react-icons/tb";
import { FaNoteSticky } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';
import { Workout, WorkoutSet } from '../objects/classes';
import ActionButton from './ActionButton';
import TrackSets from './TrackSets';
import { IPopUp } from '../interfaces/popup';
import PopUp from './popups/PopUp';

interface Props {
    workout: Workout;
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    from?: string // "add-template" or "edit-template" to show whether or not we got here from add or edit template page
    isTemplate: boolean; // Only true when creating a new template (not editing one)
    replaceExerciseRedirectURL: string;
}

const ExerciseTrackingCards = ({ workout, setWorkout, from, isTemplate, replaceExerciseRedirectURL }: Props) => {

    const handleAddSet = (exerciseId: number, insertionNumber: number) => {
        setWorkout(prevWorkout => {
            const updatedExercises = prevWorkout.exercises.map(exercise => {
                if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                    const newSet = new WorkoutSet(exercise.sets.length + 1);
                    const updatedSets = [...exercise.sets, { ...newSet, setNumber: exercise.sets.length + 1 }];
                    return { ...exercise, sets: updatedSets };
                }
                return exercise;
            })
            return { ...prevWorkout, exercises: updatedExercises };
        });
    }

    const handleRemoveExercise = (exerciseId: number, insertionNumber: number) => {
        setWorkout(prevWorkout => {
            const updatedExercises = prevWorkout.exercises.filter(exercise => exercise.id !== exerciseId || exercise.insertionNumber !== insertionNumber);
            return { ...prevWorkout, exercises: updatedExercises };
        })
    }

    const handleWeightUnitChange = (exerciseId: number, insertionNumber: number) => {
        setWorkout(prevWorkout => {
            const updatedExercises = prevWorkout.exercises.map(exercise => {
                if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                    return { ...exercise, weightUnit: exercise.weightUnit === 'lbs' ? 'kgs' : 'lbs' };
                }
                return exercise;
            })
            return { ...prevWorkout, exercises: updatedExercises };
        })
    }

    const handleNotesChange = (exerciseId: number, value: string, insertionNumber: number): void => {
        setWorkout(prevWorkout => {
            const updatedExercises = prevWorkout.exercises.map(exercise => {
                if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                    return { ...exercise, notes: value };
                }
                return exercise;
            })
            return { ...prevWorkout, exercises: updatedExercises };
        })
    }

    const toggleNotes = (exerciseId: number, insertionNumber: number): void => {
        setWorkout(prevWorkout => {
            const updatedExercises = prevWorkout.exercises.map(exercise => {
                if (exercise.id === exerciseId && exercise.insertionNumber === insertionNumber) {
                    return { ...exercise, showNotes: !exercise.showNotes };
                }
                return exercise;
            })
            return { ...prevWorkout, exercises: updatedExercises };
        })
    }

    const handleReplaceExerciseButtonClick = (exerciseId: number, insertionNumber: number) => {
        setOpenReplaceExercisePopUp(true);
        setFullReplaceExerciseRedirectURL(`${replaceExerciseRedirectURL}?id=${exerciseId}&inoetr=${insertionNumber}${from ? `&from=${from}` : ''}`);
    }

    const [openReplaceExercisePopUp, setOpenReplaceExercisePopUp] = useState<boolean>(false);
    const [fullReplaceExerciseRedirectURL, setFullReplaceExerciseRedirectURL] = useState<string>('');

    const replaceExercisePopUpContent: IPopUp = {
        buttonText: '', // Replace exercise button has no text
        header: 'Replace Exercise?',
        subHeading: 'All previously entered sets will be replaced.',
        doIt: 'Replace',
        noDontDoIt: 'Cancel'
    }

    return (
        <div className='relative z-10'>
            <ul>
                {workout.exercises.map((exercise) => (
                    <li key={`${exercise.id} - ${exercise.insertionNumber}`} className='card-bg'>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='items-center card-title-font'>{exercise.name}</div>

                            {/* Remove exercise button */}
                            <ActionButton isRemoveExercise={true} onClickFunction={() => handleRemoveExercise(exercise.id, exercise.insertionNumber)}>
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
                                    handleNotesChange(exercise.id, e.target.value, exercise.insertionNumber);
                                    e.target.style.height = 'auto'; // Reset height to auto
                                    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
                                }}
                                className="focus:outline-none bg-transparent border-b w-full mt-2 resize-none overflow-hidden min-h-8 h-auto text-sm"
                                placeholder={exercise.notes ? exercise.notes : 'Add Notes'}
                            />
                        </div>}

                        {/* Component for actual set tracking */}
                        <TrackSets workout={workout} setWorkout={setWorkout} exercise={exercise} isTemplate={isTemplate} />
                        <div className='flex flex-row justify-between items-center mt-5'>

                            {/* Replace exercise button */}
                            {/* <Link href={`${replaceExerciseRedirectURL}?id=${exercise.id}&inoetr=${exercise.insertionNumber}${from ? `&from=${from}` : ''}`}> */}
                            <ActionButton onClickFunction={() => handleReplaceExerciseButtonClick(exercise.id, exercise.insertionNumber)}>
                                <TbSwitch3 />
                            </ActionButton>
                            {/* </Link> */}

                            {/* Show/hide notes for exercise button */}
                            <ActionButton onClickFunction={() => toggleNotes(exercise.id, exercise.insertionNumber)}>
                                <FaNoteSticky />
                            </ActionButton>

                            {/* Change weight unit for exercise button */}
                            <ActionButton onClickFunction={() => handleWeightUnitChange(exercise.id, exercise.insertionNumber)}>
                                <span className='text-xs'>{exercise.weightUnit === 'lbs' ? 'kgs' : 'lbs'}</span>
                            </ActionButton>

                            {/* Add set button */}
                            <ActionButton onClickFunction={() => handleAddSet(exercise.id, exercise.insertionNumber)}>
                                <FaPlus />
                            </ActionButton>

                        </div>
                    </li>
                ))}
            </ul>
            {openReplaceExercisePopUp && <PopUp popUpContent={replaceExercisePopUpContent} onDontDoIt={() => setOpenReplaceExercisePopUp(false)} onDoItRedirectURL={fullReplaceExerciseRedirectURL} />}
        </div >
    )
}

export default ExerciseTrackingCards