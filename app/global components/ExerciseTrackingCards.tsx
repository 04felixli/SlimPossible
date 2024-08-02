'use client';
import React, { useEffect, useState } from 'react';
import { TbSwitch3 } from "react-icons/tb";
import { FaNoteSticky } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';
import { Exercise, Workout, WorkoutSet } from '../workout/objects/classes';
import ActionButton from '../workout/components/ActionButton';
import TrackSets from '../workout/components/TrackSets';
import { IPopUp } from '../workout/interfaces/popup';
import ConfirmationPopUp from './popups/ConfirmationPopUp';
import { motion } from 'framer-motion';

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
    deleteSet: (exerciseId: number, insertionNumber: number, setNumber: number) => void;
    from?: string // "add-template" or "edit-template" to show whether or not we got here from add or edit template page
    isTemplate: boolean; // Only true when creating a new template (not editing one)
    replaceExerciseRedirectURL: string;
}

interface DropIndicatorProps {
    exerciseId: number;
    insertionNumber: number;
}

const DropIndicator = ({ exerciseId, insertionNumber }: DropIndicatorProps) => {
    return (
        <div
            data-exerciseid={exerciseId || -1}
            data-insertionnumber={insertionNumber || -1}
            className="my-0.5 h-1 w-full bg-gray-400 opacity-0"
        />
    );
};

const ExerciseTrackingCards = ({ workout, setWorkout, addSet, removeExercise, changeWeightUnit, updateNotes, toggleNotes, toggleCompletedSet, changeWeightValue, changeRepsValue, from, isTemplate, replaceExerciseRedirectURL, deleteSet }: Props) => {

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

    const [draggedExercise, setDraggedExercise] = useState<{ exerciseId: Number, insertionNumber: Number } | null>(null);

    const handleDragStart = (exercise: Exercise) => {
        setDraggedExercise({ exerciseId: exercise.id, insertionNumber: exercise.insertionNumber });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        highlightIndicator(e, index, "1");
    };

    const highlightIndicator = (e: React.DragEvent<HTMLDivElement>, index: number, opacity: string) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const clearHighlights = (els?: HTMLElement[]) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const getIndicators = () => {
        return Array.from(
            document.querySelectorAll(
                `[data-exerciseid]`
            ) as unknown as HTMLElement[]
        );
    };

    const handleDragLeave = () => {
        clearHighlights();
    };

    const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const draggedExerciseId = draggedExercise!.exerciseId;
        const draggedInsertionNumber = draggedExercise!.insertionNumber;

        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const hoverOverExerciseId = element.dataset.exerciseid || "-1";
        const hoverOverInsertionNumber = element.dataset.insertionnumber || "-1";

        if (draggedExerciseId !== Number(hoverOverExerciseId) && draggedInsertionNumber !== Number(hoverOverInsertionNumber)) {
            setWorkout(prevWorkout => {
                const exercises = [...prevWorkout.exercises];

                // Find the index of the dragged exercise
                const draggedIndex = exercises.findIndex(
                    exercise => exercise.id === Number(draggedExerciseId) && exercise.insertionNumber === Number(draggedInsertionNumber)
                );

                // Ensure valid indices
                if (draggedIndex === -1) return prevWorkout;

                // Remove the dragged exercise
                const [draggedExercise] = exercises.splice(draggedIndex, 1);

                // Find the index of the hovered exercise
                const hoverIndex = hoverOverExerciseId !== "-1" && hoverOverInsertionNumber !== "-1"
                    ? exercises.findIndex(
                        exercise => exercise.id === Number(hoverOverExerciseId) && exercise.insertionNumber === Number(hoverOverInsertionNumber)
                    )
                    : -1;

                // Insert the dragged exercise
                if (hoverIndex !== -1) {
                    // Insert the dragged exercise in front of the hovered exercise
                    exercises.splice(hoverIndex, 0, draggedExercise);
                } else {
                    // Place the dragged exercise at the end of the array
                    exercises.push(draggedExercise);
                }

                // Return the updated workout object
                console.log({ ...prevWorkout, exercises: exercises })
                return { ...prevWorkout, exercises: exercises };
            });
        }
    }

    return (
        <div>
            <ul>
                {workout.exercises.map((exercise, index) => (
                    <li key={`${exercise.id} - ${exercise.insertionNumber}`} className=''>
                        <DropIndicator exerciseId={exercise.id} insertionNumber={exercise.insertionNumber} />
                        <motion.div layout transition={{ duration: 0.3 }} className='card-bg' draggable onDragStart={() => handleDragStart(exercise)} onDrop={(e) => handleDragEnd(e)} onDragLeave={() => handleDragLeave()} onDragOver={(e) => handleDragOver(e, index)}>
                            <div className='flex flex-row justify-between items-center'>
                                <div className='items-center card-title-font'>{exercise.name}</div>

                                <div className='flex flex-row justify-between items-center mt-5 max-lg:hidden w-2/12'>

                                    <ActionButton onClickFunction={() => handleReplaceExerciseButtonClick(exercise.id, exercise.insertionNumber)}>
                                        <TbSwitch3 />
                                    </ActionButton>

                                    {/* Show/hide notes for exercise button */}
                                    <ActionButton onClickFunction={() => toggleNotes(exercise.id, exercise.insertionNumber)}>
                                        <FaNoteSticky />
                                    </ActionButton>

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
                            <TrackSets changeWeightUnit={changeWeightUnit} toggleCompletedSet={toggleCompletedSet} changeWeightValue={changeWeightValue} changeRepsValue={changeRepsValue} exercise={exercise} isTemplate={isTemplate} deleteSet={deleteSet} />
                            <div className='flex flex-row justify-between items-center mt-5 lg:hidden'>
                                <ActionButton onClickFunction={() => handleReplaceExerciseButtonClick(exercise.id, exercise.insertionNumber)}>
                                    <TbSwitch3 />
                                </ActionButton>

                                {/* Show/hide notes for exercise button */}
                                <ActionButton onClickFunction={() => toggleNotes(exercise.id, exercise.insertionNumber)}>
                                    <FaNoteSticky />
                                </ActionButton>

                                {/* Add set button */}
                                <ActionButton onClickFunction={() => addSet(exercise.id, exercise.insertionNumber)}>
                                    <FaPlus />
                                </ActionButton>

                            </div>
                        </motion.div>
                    </li>
                ))}
            </ul>
            <DropIndicator exerciseId={-1} insertionNumber={-1} />
            {openReplaceExercisePopUp && <ConfirmationPopUp onDoIt={() => { }} popUpContent={replaceExercisePopUpContent} onDontDoIt={() => setOpenReplaceExercisePopUp(false)} onDoItRedirectURL={fullReplaceExerciseRedirectURL} />}
        </div >
    )
}

export default ExerciseTrackingCards