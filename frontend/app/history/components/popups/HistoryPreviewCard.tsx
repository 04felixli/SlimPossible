'use client'
import React from 'react'
import './popup.css'; // Make sure to import the CSS file
import { useHistory } from '@/app/contexts/historyContext';
import { Workout } from '@/app/workout/objects/classes';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { formatDuration, formatTime, getFormattedDurationStringGivenStartAndEnd } from '@/app/global components/Library/utilFunctions';
import { FaRegWindowClose } from "react-icons/fa";
import Link from 'next/link';
import PopUpLayout, { popupContentClassNames } from '@/app/global components/popups/PopUpLayout';


interface Props {
    workout?: Workout;
    closePopUp: () => void;
}

const HistoryPreviewCard = ({ workout, closePopUp }: Props) => {
    const { startHistory } = useHistory();

    // Should never happen 
    if (!workout) {
        return (<></>);
    }

    return (
        <PopUpLayout closePopUp={closePopUp} className='w-6/12' popupContentClassName={popupContentClassNames.previewCard}>
            {/* x and edit buttons */}
            <section className='flex justify-between items-center'>
                <button><FaRegWindowClose className='w-6 h-6' onClick={closePopUp} /></button>
                <Link href={`/history/edit`} onClick={() => startHistory(JSON.parse(JSON.stringify(workout)))}>Edit</Link>
            </section>

            {/* workout name */}
            <div className='card-title-font items-center flex justify-center'>{workout.name}</div>

            {/* sub headings */}
            <section className='font-thin text-sm'>
                <div className='flex flex-row items-center'>
                    <FaCalendar className='mr-2' />
                    <div>{formatTime(workout.startTime!)}</div>
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
        </PopUpLayout>
    )
}

export default HistoryPreviewCard