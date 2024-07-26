'use client';
import React, { useEffect } from 'react';
import '../../../globals.css';
import { useWorkout } from '@/app/contexts/workoutContext';
import { formatDuration } from '@/app/global components/Library/utilFunctions';
import { localStorageKeys } from '@/app/contexts/util/workoutFunctions';
import { Workout } from '../../objects/classes';

const Timer = () => {
    const { workout, startWorkout, setWorkout } = useWorkout();

    useEffect(() => {
        const workoutInProgress = localStorage.getItem(localStorageKeys.workout);

        if (!workoutInProgress && !workout.startTime) {
            startWorkout();
            return;
        }

        const parsedWorkout: Workout = JSON.parse(workoutInProgress!);
        setWorkout({ ...parsedWorkout, startTime: new Date(parsedWorkout.startTime!) });
    }, []);

    return (
        <div className='thin-font'>
            {formatDuration(workout.duration)}
        </div>
    );
};

export default Timer;
