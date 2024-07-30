'use client'
import { useHistory } from '@/app/contexts/historyContext'
import { formatDuration, formatTime, getFormattedDurationStringGivenStartAndEnd } from '@/app/global components/Library/utilFunctions'
import React, { useEffect, useState } from 'react'
import { FaCalendar, FaClock } from 'react-icons/fa'
import EditDurationPopUp from '../../components/popups/EditDurationPopUp'
import { AiFillEdit } from "react-icons/ai";

const WorkoutHistorySubInfo = () => {
    const { history, setHistory } = useHistory();
    const [isEditDurationOpen, setIsEditDurationOpen] = useState<boolean>(false);

    const closePopUp = () => {
        setIsEditDurationOpen(false);
    }

    const openPopUp = () => {
        setIsEditDurationOpen(true);
    }

    return (
        <div>
            <section className='font-thin text-sm'>
                <div className='flex flex-row items-center border-b'>
                    <div onClick={openPopUp}>
                        <div className='flex flex-row items-center'>
                            <FaCalendar className='mr-2' />
                            {history.startTime && <div>{formatTime(history.startTime!)}</div>}
                        </div>
                        <div className='flex flex-row items-center'>
                            <FaClock className='mr-2' />
                            {history.startTime && history.endTime && <div>{getFormattedDurationStringGivenStartAndEnd(history.startTime, history.endTime)}</div>}
                        </div>
                    </div>
                </div>

                <div className='mt-3'>{history.exercises.length} Exercises</div>


            </section>

            {isEditDurationOpen && <EditDurationPopUp closePopUp={closePopUp} />}
        </div>
    )
}

export default WorkoutHistorySubInfo