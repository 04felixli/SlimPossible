import React from 'react'
import { WorkoutHistory } from '../interfaces/history'
import { FaCalendar } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { formatTime } from '../lib';

interface Props {
    workoutHistories: WorkoutHistory[];
}

const HistoryCards = (props: Props) => {
    return (
        <div>
            <ul>
                {props.workoutHistories.map((workoutHistory) => (
                    <li key={workoutHistory.id} className='card-bg'>
                        <div className='flex justify-center items-center card-title-font'>{workoutHistory.name}</div>
                        <section className='font-thin text-sm'>
                            <div className='flex flex-row items-center'>
                                <FaCalendar className='mr-2' />
                                <div>{new Date(workoutHistory.date).toLocaleString()}</div>
                            </div>
                            <div className='flex flex-row items-center'>
                                <FaClock className='mr-2' />
                                <div>{formatTime(workoutHistory.duration)}</div>
                            </div>
                            <div>{workoutHistory.exercises.length} Exercises</div>
                        </section>
                        <ul>
                            {workoutHistory.exercises.map((exercise) => (
                                <li key={exercise.id} className='flex flex-row items-center mt-2 text-sm'>
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