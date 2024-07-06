'use client'
import { useHistory } from '@/app/contexts/historyContext';
import { getFormattedDurationStringGivenStartAndEnd } from '@/app/global components/Library/utilFunctions';
import PopUpLayout from '@/app/global components/popups/PopUpLayout';
import React, { useState } from 'react'
import { FaRegWindowClose } from 'react-icons/fa';

interface Props {
    closePopUp: () => void;
}

const EditDurationPopUp = ({ closePopUp }: Props) => {
    const { history, changeStartAndEndTime } = useHistory();

    const formatDateForDatetimeLocal = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const getDuration = (newStartTime: string, newEndTime: string) => {
        const newStartTimeDate = new Date(newStartTime);
        const newEndTimeDate = new Date(newEndTime);

        return getFormattedDurationStringGivenStartAndEnd(newStartTimeDate, newEndTimeDate)
    }

    const changeButtonDisabled = () => {
        if (getDuration(startTime, endTime) === 'Please enter valid start and end times') {
            return true
        }

        return false
    }

    const handleChangeTime = () => {
        const newStartTimeDate = new Date(startTime);
        const newEndTimeDate = new Date(endTime);
        newEndTimeDate.setSeconds(new Date(history.endTime!).getSeconds())

        changeStartAndEndTime(newStartTimeDate, newEndTimeDate);
        closePopUp();
    }

    const [startTime, setStartTime] = useState<string>(formatDateForDatetimeLocal(new Date(history.startTime!)));
    const [endTime, setEndTime] = useState<string>(formatDateForDatetimeLocal(new Date(history.endTime!)));

    return (
        <PopUpLayout closePopUp={closePopUp}>
            <section className='flex justify-between items-center'>
                <button><FaRegWindowClose className='w-6 h-6' onClick={closePopUp} /></button>
                <button
                    disabled={changeButtonDisabled()}
                    onClick={handleChangeTime}
                    className={`${changeButtonDisabled() ? 'text-disabled-color' : ''}`}
                >
                    Change
                </button>
            </section>
            <div className='flex justify-center items-center card-title-font mt-3'>Adjust Start and End Time</div>

            <div className='flex flex-col mt-3'>
                <div className='card-title-font'>
                    Duration:
                </div>
                <div className='flex justify-center thin-font'>
                    {getDuration(startTime, endTime)}
                </div>
            </div>

            <div className='flex flex-col mt-10'>
                <div className='card-title-font'>
                    Start Time:
                </div>
                <div className='flex justify-center'>
                    <input
                        type="datetime-local"
                        id="change-start-time"
                        name="change-start-time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className='bg-transparent thin-font'
                    />
                </div>
            </div>

            <div className='flex flex-col mt-3'>
                <div className='card-title-font'>
                    End Time:
                </div>
                <div className='flex justify-center'>
                    <input
                        type="datetime-local"
                        id="change-end-time"
                        name="change-end-time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className='bg-transparent thin-font'
                    />
                </div>
            </div>
        </PopUpLayout>
    )
}

export default EditDurationPopUp