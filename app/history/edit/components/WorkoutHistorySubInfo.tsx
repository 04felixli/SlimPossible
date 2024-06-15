'use client'
import { useHistory } from '@/app/contexts/historyContext'
import { formatDuration, formatTime } from '@/app/global components/Library/utilFunctions'
import React from 'react'
import { FaCalendar, FaClock } from 'react-icons/fa'

const WorkoutHistorySubInfo = () => {
    const { history, setHistory } = useHistory();

    if (history.duration == 0) {
        return (
            <>
            </>
        )
    }

    return (
        <section className='font-thin text-sm'>
            <div className='flex flex-row items-center'>
                <FaCalendar className='mr-2' />
                <div>{formatTime(history.date.toLocaleString())}</div>
            </div>
            <div className='flex flex-row items-center'>
                <FaClock className='mr-2' />
                <div>{formatDuration(history.duration)}</div>
            </div>
            <div>{history.exercises.length} Exercises</div>
        </section>
    )
}

export default WorkoutHistorySubInfo