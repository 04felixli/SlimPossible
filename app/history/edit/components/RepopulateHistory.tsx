"use client"
import { useHistory } from '@/app/contexts/historyContext';
import { useTemplate } from '@/app/contexts/templateContext';
import { localStorageKeys } from '@/app/contexts/util/workoutFunctions';
import { Workout } from '@/app/workout/objects/classes';
import React, { useEffect } from 'react'

const RepopulateHistory = () => {
    const { history, setHistory } = useHistory();
    useEffect(() => {
        const historyInProgress = localStorage.getItem(localStorageKeys.history);

        if (historyInProgress && !history.startTime) {
            const parsedHistory: Workout = JSON.parse(historyInProgress!);
            setHistory(prevHistory => {
                const newHistory = { ...parsedHistory, startTime: new Date(parsedHistory.startTime!), endTime: new Date(parsedHistory.endTime!) };
                return newHistory;
            });
        }
    }, []);


    return (
        <></>
    )
}

export default RepopulateHistory