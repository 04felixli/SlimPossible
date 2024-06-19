'use client';
import React, { useEffect } from 'react';
import '../../../globals.css';
import { useWorkout } from '@/app/contexts/workoutContext';
import { formatDuration } from '@/app/global components/Library/utilFunctions';

const Timer = () => {
    const { workout, startWorkout } = useWorkout();

    useEffect(() => {
        if (!workout.startTime) {
            startWorkout();
        }
    }, []);

    return (
        <div className='thin-font'>
            {formatDuration(workout.duration)}
        </div>
    );
};

export default Timer;
