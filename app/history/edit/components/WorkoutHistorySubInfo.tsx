'use client'
import { useHistory } from '@/app/contexts/historyContext'
import { formatDuration, formatTime, getFormattedDurationStringGivenStartAndEnd } from '@/app/global components/Library/utilFunctions'
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
                <div>{formatTime(history.startTime!.toLocaleString())}</div>
            </div>
            <div className='flex flex-row items-center'>
                <FaClock className='mr-2' />
                <div>{getFormattedDurationStringGivenStartAndEnd(history.startTime, history.endTime)}</div>
            </div>
            <div>{history.exercises.length} Exercises</div>
        </section>
    )
}

export default WorkoutHistorySubInfo