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
            const parsedTemplate: Workout = JSON.parse(historyInProgress!);
            setHistory({ ...parsedTemplate, startTime: new Date(parsedTemplate.startTime!) });
        }
    }, []);


    return (
        <></>
    )
}

export default RepopulateHistory