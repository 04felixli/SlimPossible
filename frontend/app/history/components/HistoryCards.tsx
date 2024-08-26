'use client'
import React, { useState } from 'react';
import { FaCalendar } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { convertIWorkoutHistoryToWorkout, formatTime, getFormattedDurationStringGivenStartAndEnd } from '@/app/global components/Library/utilFunctions';
import { IWorkoutHistory } from '@/app/global components/Interfaces/historyInterfaces';
import { Workout } from '@/app/global components/objects/classes';
import HistoryPreviewCard from './popups/HistoryPreviewCard';

interface Props {
    workoutHistories: IWorkoutHistory[];
}

interface HistoryPreviewCardState {
    // if isOpen == true, workout must be defined
    isOpen: boolean;
    workout: Workout | undefined;
}

const initialState: HistoryPreviewCardState = {
    isOpen: false,
    workout: undefined,
};

const HistoryCards = ({ workoutHistories }: Props) => {
    const [historyPreviewCard, setHistoryPreviewCard] = useState<HistoryPreviewCardState>(initialState);

    const handleHistoryCardClick = (rawTemplate: IWorkoutHistory) => {
        const historyObject: Workout = convertIWorkoutHistoryToWorkout(rawTemplate)

        // Open workout history preview card
        setHistoryPreviewCard(prevState => {
            return { ...prevState, isOpen: true, workout: historyObject }
        })
    }

    const closePopUp = () => {
        // Close workout history preview card and reset workout
        setHistoryPreviewCard(prevState => {
            return { ...prevState, isOpen: false, workout: undefined }
        })
    }

    return (
        <div>
            <ul>
                {workoutHistories.map((workoutHistory) => (
                    <li key={workoutHistory.id} className='card-bg hover:scale-[101%] duration-300 cursor-pointer' onClick={() => handleHistoryCardClick(workoutHistory)}>
                        <div className='flex justify-center items-center card-title-font'>
                            <span className='truncate max-w-full'>
                                {workoutHistory.name}
                            </span>
                        </div>
                        <section className='font-thin text-sm'>
                            <div className='flex flex-row items-center'>
                                <FaCalendar className='mr-2' />
                                <div>{formatTime(workoutHistory.startTime)}</div>
                            </div>
                            <div className='flex flex-row items-center'>
                                <FaClock className='mr-2' />
                                <div>{getFormattedDurationStringGivenStartAndEnd(workoutHistory.startTime, workoutHistory.endTime)}</div>
                            </div>
                            <div>{workoutHistory.exercises.length} Exercises</div>
                        </section>
                        <ul>
                            {workoutHistory.exercises.map((exercise) => (
                                <li key={`${exercise.id} - ${exercise.insertionNumber}`} className='flex flex-row items-center mt-2 text-sm'>
                                    <div className='border mr-4 px-3 rounded-full'>{exercise.sets.length}</div>
                                    <div>{`${exercise.name} (${exercise.equipment})`}</div>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            {historyPreviewCard.isOpen && <HistoryPreviewCard workout={historyPreviewCard.workout} closePopUp={closePopUp} />}
        </div>
    )
}

export default HistoryCards