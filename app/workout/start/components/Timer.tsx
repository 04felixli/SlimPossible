'use client';
import React, { useEffect } from 'react';
import '../../../globals.css';
import { useWorkout } from '@/app/contexts/workoutContext';
import { getFormattedDurationStringGivenStartAndEnd } from '@/app/global components/Library/utilFunctions';

const Timer = () => {
    const { workout, setWorkout } = useWorkout();

    useEffect(() => {
        if (!workout.startTime) {
            setWorkout(prevWorkout => ({ ...prevWorkout, startTime: new Date() }));
        }

        // initial update for end time every time page loads / reloads
        setWorkout(prevWorkout => ({
            ...prevWorkout,
            endTime: new Date()
        }));

        // Repeated timer updates end time every second
        const interval = setInterval(() => {
            setWorkout(prevWorkout => ({
                ...prevWorkout,
                endTime: new Date()
            }));
        }, 1000);

        return () => clearInterval(interval);

    }, [workout.startTime, setWorkout]);

    return (
        <div className='thin-font'>
            {getFormattedDurationStringGivenStartAndEnd(workout.startTime, workout.endTime)}
        </div>
    );
};

export default Timer;
