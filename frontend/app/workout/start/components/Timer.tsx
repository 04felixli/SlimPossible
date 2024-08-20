'use client'
import React, { useEffect, useState } from 'react';
import '../../../globals.css';
import { useWorkout } from '@/app/contexts/workoutContext';
import { deleteLocalStorage, setLocalStorage } from '@/app/global components/Library/utilFunctions';
import { localStorageKeys } from '@/app/contexts/util/workoutFunctions';
import { Workout } from '../../../global components/objects/classes';

const Timer = () => {
    const { workout, startWorkout, setWorkout } = useWorkout();
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const workoutInProgress = localStorage.getItem(localStorageKeys.workout);

        if (!workoutInProgress && !workout.startTime) {
            startWorkout();

            intervalId = setInterval(() => {
                setDuration(prevDuration => {
                    const newDuration = prevDuration + 1;
                    setLocalStorage("workout-duration", newDuration);
                    return newDuration;
                });
            }, 1000);
        } else {
            const parsedWorkout: Workout = JSON.parse(workoutInProgress!);
            setWorkout(_ => {
                const newWorkout: Workout = { ...parsedWorkout, startTime: new Date(parsedWorkout.startTime!) };
                startWorkout(newWorkout);
                return newWorkout;
            });

            const startTime = new Date(parsedWorkout.startTime!).getTime();
            const currentTime = Date.now();
            const initialDuration = Math.floor((currentTime - startTime) / 1000); // In seconds
            setDuration(initialDuration);

            intervalId = setInterval(() => {
                setDuration(prevDuration => {
                    const newDuration = prevDuration + 1;
                    setLocalStorage("workout-duration", newDuration);
                    return newDuration;
                });
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
            deleteLocalStorage("workout-duration");
        };
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
        <div className='thin-font'>
            {getTimerValue(duration)}
        </div>
    );
};

export default Timer;
