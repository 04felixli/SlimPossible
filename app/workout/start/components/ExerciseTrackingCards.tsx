'use client';
import React, { useEffect } from 'react';
import { useExercisesToTrack } from '../../../contexts/exercisesToTrackContext';
import TrackSets from './TrackSets';
import { TbSwitch3 } from "react-icons/tb";
import { FaNoteSticky } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

const ExerciseTrackingCards = () => {
    const { exercisesToTrack, setExercisesToTrack } = useExercisesToTrack();

    return (
        <div>
            <ul>
                {exercisesToTrack.map((exercise) => (
                    <li key={exercise.id} className='card-bg'>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='items-center card-title-font underline'>{exercise.name}</div>

                            {/* Remove exercise button */}
                            <div className='flex flex-row rounded-full bg-button-color'>
                                <button className='w-full h-full p-2'>
                                    <RiDeleteBin2Fill />
                                </button>
                            </div>
                        </div>
                        <div className='flex justify-between thin-font'>
                            <div>{exercise.equipment}</div>
                            <div>{exercise.targetMuscle}</div>
                        </div>
                        <TrackSets exercise={exercise} />
                        <div className='flex flex-row justify-between items-center mt-5'>

                            {/* Replace exercise button */}
                            <div className='flex flex-row rounded-full bg-button-color'>
                                <button className='w-full h-full py-1 px-6'>
                                    <TbSwitch3 />
                                </button>
                            </div>

                            {/* Show/hide notes for exercise button */}
                            <div className='flex flex-row rounded-full bg-button-color'>
                                <button className='w-full h-full py-1 px-6'>
                                    <FaNoteSticky />
                                </button>
                            </div>

                            {/* Change weight unit for exercise button */}
                            <div className='flex flex-row rounded-full bg-button-color text-sm'>
                                <button className='w-full h-full py-1 px-6 flex'>
                                    <span className='text-xs'>{exercise.weightUnit}</span>
                                </button>
                            </div>

                            {/* Add set button */}
                            <div className='flex flex-row rounded-full bg-button-color'>
                                <button className='w-full h-full py-1 px-6'>
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ExerciseTrackingCards