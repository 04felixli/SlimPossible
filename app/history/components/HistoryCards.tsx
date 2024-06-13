'use client'
import React from 'react'
import { FaCalendar } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { convertIWorkoutHistoryToWorkout, formatDuration, formatTime } from '@/app/global components/Library/utilFunctions';
import { IWorkoutHistory } from '@/app/global components/Interfaces/historyInterfaces';
import { useHistory } from '@/app/contexts/historyContext';
import { Workout } from '@/app/workout/objects/classes';

interface Props {
    workoutHistories: IWorkoutHistory[];
}

const HistoryCards = ({ workoutHistories }: Props) => {
    const { history, setHistory } = useHistory();

    const handleHistoryCardClick = (rawTemplate: IWorkoutHistory) => {
        const templateObject: Workout = convertIWorkoutHistoryToWorkout(rawTemplate)
        setHistory(templateObject);
    }

    return (
        <div>
            <ul>
                {workoutHistories.map((workoutHistory) => (
                    <li key={workoutHistory.id} className='card-bg'>
                        <div className='flex justify-center items-center card-title-font'>{workoutHistory.name}</div>
                        <section className='font-thin text-sm'>
                            <div className='flex flex-row items-center'>
                                <FaCalendar className='mr-2' />
                                <div>{formatTime(workoutHistory.createdDate.toLocaleString())}</div>
                            </div>
                            <div className='flex flex-row items-center'>
                                <FaClock className='mr-2' />
                                <div>{formatDuration(workoutHistory.duration)}</div>
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
        </div>
    )
}

export default HistoryCards