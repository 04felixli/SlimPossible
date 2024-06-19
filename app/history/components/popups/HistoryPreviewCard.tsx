'use client'
import React from 'react'
import './popup.css'; // Make sure to import the CSS file
import { useHistory } from '@/app/contexts/historyContext';
import { Workout } from '@/app/workout/objects/classes';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { formatDuration, formatTime, getFormattedDurationStringGivenStartAndEnd } from '@/app/global components/Library/utilFunctions';
import Button from '@/app/global components/Buttons/Button';
import { FaRegWindowClose } from "react-icons/fa";
import Link from 'next/link';


interface Props {
    workout?: Workout;
    closePopUp: () => void;
}

const HistoryPreviewCard = ({ workout, closePopUp }: Props) => {
    const { history, setHistory } = useHistory();

    // Should never happen 
    if (!workout) {
        return (<></>);
    }

    return (
        <div className='popup-overlay hover:cursor-pointer z-50' onClick={closePopUp}>
            <div className='popup-content hover:cursor-default w-5/12' onClick={(e) => e.stopPropagation()}>
                {/* x and edit buttons */}
                <section className='flex justify-between items-center'>
                    <button><FaRegWindowClose className='w-6 h-6' onClick={closePopUp} /></button>
                    <Link href={`/history/edit`} onClick={() => setHistory(workout)}>Edit</Link>
                </section>

                {/* workout name */}
                <div className='card-title-font items-center flex justify-center'>{workout.name}</div>

                {/* sub headings */}
                <section className='font-thin text-sm'>
                    <div className='flex flex-row items-center'>
                        <FaCalendar className='mr-2' />
                        <div>{formatTime(workout.startTime!.toLocaleString())}</div>
                    </div>
                    <div className='flex flex-row items-center'>
                        <FaClock className='mr-2' />
                        <div>{getFormattedDurationStringGivenStartAndEnd(workout.startTime, workout.endTime)}</div>
                    </div>
                    <div>{workout.exercises.length} Exercises</div>
                </section>

                {/* list of exercises and sets in workout */}
                <ul className='mt-5'>
                    {workout.exercises.map((exercise, index) => (
                        <li key={`${exercise.id} - ${exercise.insertionNumber}`} className={`flex flex-col ${index != 0 ? 'mt-2' : ''}`}>
                            <div>{`${exercise.name} (${exercise.equipment})`}</div>
                            <ul>
                                {exercise.sets.map((set) => (
                                    <li key={`${set.setNumber}`} className='flex flex-row'>
                                        <div className={`px-2`}>{`${set.setNumber})`}</div>
                                        <div>{`${set.weight} ${exercise.weightUnit} x ${set.reps}`}</div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default HistoryPreviewCard