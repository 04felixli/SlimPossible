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
        setWorkout(_ => {
            const newWorkout: Workout = { ...parsedWorkout, startTime: new Date(parsedWorkout.startTime!) }
            startWorkout(newWorkout);
            return newWorkout;
        });
    }, []);

    const getTimerValue = (durationInSeconds: number) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    return (
        <div className='thin-font border'>
            {getTimerValue(workout.duration)}
        </div>
    );
};

export default Timer;
