"use client"
import React, { useEffect } from 'react'
import { useWorkout } from './contexts/workoutContext'
import { useTemplate } from './contexts/templateContext';
import { useHistory } from './contexts/historyContext';
import { action } from './contexts/util/workoutFunctions';

const DeleteInformation = () => {
    const { endWorkout } = useWorkout();
    const { endTemplate } = useTemplate();
    const { endHistory } = useHistory();

    useEffect(() => {
        endWorkout(action.cancel);
        endTemplate(action.cancel);
        endHistory(action.cancel);
    }, [])

    return (
        <></>
    )
}

export default DeleteInformation