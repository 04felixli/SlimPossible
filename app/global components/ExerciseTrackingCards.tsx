'use client';
import React, { useState } from 'react';
import { TbSwitch3 } from "react-icons/tb";
import { FaNoteSticky } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';
import { Workout, WorkoutSet } from '../workout/objects/classes';
import ActionButton from '../workout/components/ActionButton';
import TrackSets from '../workout/components/TrackSets';
import { IPopUp } from '../workout/interfaces/popup';
import ConfirmationPopUp from './popups/ConfirmationPopUp';

interface Props {
    workout: Workout;
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    addSet: (exerciseId: number, insertionNumber: number) => void;
    removeExercise: (exerciseId: number, insertionNumber: number) => void;
    changeWeightUnit: (exerciseId: number, insertionNumber: number) => void;
    updateNotes: (exerciseId: number, value: string, insertionNumber: number) => void;
    toggleNotes: (exerciseId: number, insertionNumber: number) => void;
    toggleCompletedSet: (exerciseId: number, setNumber: number, insertionNumber: number) => void,
    changeWeightValue: (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => void;
    changeRepsValue: (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => void;
    from?: string // "add-template" or "edit-template" to show whether or not we got here from add or edit template page
    isTemplate: boolean; // Only true when creating a new template (not editing one)
    replaceExerciseRedirectURL: string;
}

const ExerciseTrackingCards = ({ workout, setWorkout, addSet, removeExercise, changeWeightUnit, updateNotes, toggleNotes, toggleCompletedSet, changeWeightValue, changeRepsValue, from, isTemplate, replaceExerciseRedirectURL }: Props) => {

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
        <div>
            <ul>
                {workout.exercises.map((exercise) => (
                    <li key={`${exercise.id} - ${exercise.insertionNumber}`} className='card-bg'>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='items-center card-title-font'>{exercise.name}</div>

                            <div className='flex flex-row justify-between items-center mt-5 max-lg:hidden w-2/12'>

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
                                {/* <ActionButton onClickFunction={() => changeWeightUnit(exercise.id, exercise.insertionNumber)}>
                                <span className='text-xs'>{exercise.weightUnit === 'lbs' ? 'kgs' : 'lbs'}</span>
                            </ActionButton> */}

                                {/* Add set button */}
                                <ActionButton onClickFunction={() => addSet(exercise.id, exercise.insertionNumber)}>
                                    <FaPlus />
                                </ActionButton>

                                {/* Remove exercise button */}
                                <ActionButton isRemoveExercise={true} onClickFunction={() => removeExercise(exercise.id, exercise.insertionNumber)}>
                                    <RiDeleteBin2Fill />
                                </ActionButton>
                            </div>

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
                                    updateNotes(exercise.id, e.target.value, exercise.insertionNumber);
                                    e.target.style.height = 'auto'; // Reset height to auto
                                    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
                                }}
                                className="focus:outline-none bg-transparent border-b w-full mt-2 resize-none overflow-hidden min-h-8 h-auto text-sm"
                                placeholder={exercise.notes ? exercise.notes : 'Add Notes'}
                            />
                        </div>}

                        {/* Component for actual set tracking */}
                        <TrackSets changeWeightUnit={changeWeightUnit} toggleCompletedSet={toggleCompletedSet} changeWeightValue={changeWeightValue} changeRepsValue={changeRepsValue} exercise={exercise} isTemplate={isTemplate} />
                        <div className='flex flex-row justify-between items-center mt-5 lg:hidden'>

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
                            {/* <ActionButton onClickFunction={() => changeWeightUnit(exercise.id, exercise.insertionNumber)}>
                                <span className='text-xs'>{exercise.weightUnit === 'lbs' ? 'kgs' : 'lbs'}</span>
                            </ActionButton> */}

                            {/* Add set button */}
                            <ActionButton onClickFunction={() => addSet(exercise.id, exercise.insertionNumber)}>
                                <FaPlus />
                            </ActionButton>

                        </div>
                    </li>
                ))}
            </ul>
            {openReplaceExercisePopUp && <ConfirmationPopUp onDoIt={() => { }} popUpContent={replaceExercisePopUpContent} onDontDoIt={() => setOpenReplaceExercisePopUp(false)} onDoItRedirectURL={fullReplaceExerciseRedirectURL} />}
        </div >
    )
}

export default ExerciseTrackingCards