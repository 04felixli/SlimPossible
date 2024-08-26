'use client'
import React from 'react'
import './popup.css';
import { useHistory } from '@/app/contexts/historyContext';
import { Workout } from '@/app/global components/objects/classes';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { formatTime, getFormattedDurationStringGivenStartAndEnd } from '@/app/global components/Library/utilFunctions';
import { FaRegWindowClose } from "react-icons/fa";
import PopUpLayout, { popupContentClassNames } from '@/app/global components/popups/PopUpLayout';
import CustomLink from '@/app/global components/CustomLink';


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
        <PopUpLayout closePopUp={closePopUp} popupContentClassName={popupContentClassNames.previewCard}>
            {/* x and edit buttons */}
            <section className='flex justify-between items-center'>
                <button><FaRegWindowClose className='w-6 h-6' onClick={closePopUp} /></button>
                <CustomLink href={`/history/edit`} onClick={() => startHistory(JSON.parse(JSON.stringify(workout)))}>Edit</CustomLink>
            </section>

            {/* workout name */}
            <div className='card-title-font items-center flex justify-center'>
                <span className='truncate max-w-full'>
                    {workout.name}
                </span>
            </div>

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