"use client"
import React, { useEffect } from 'react';
import { useWorkout } from './contexts/workoutContext';
import { useTemplate } from './contexts/templateContext';
import { useHistory } from './contexts/historyContext';

const DeleteInformation = () => {
    const { resetWorkout } = useWorkout();
    const { resetTemplate } = useTemplate();
    const { resetHistory } = useHistory();

    useEffect(() => {
        resetWorkout();
        resetTemplate();
        resetHistory();
    }, [])

    return (
        <></>
    )
}

export default DeleteInformation