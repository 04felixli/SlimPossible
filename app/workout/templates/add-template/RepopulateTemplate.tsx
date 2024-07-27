"use client"
import { useTemplate } from '@/app/contexts/templateContext';
import { localStorageKeys } from '@/app/contexts/util/workoutFunctions';
import React, { useEffect } from 'react'
import { Workout } from '../../objects/classes';

const RepopulateTemplate = () => {
    const { template, startTemplate, setTemplate } = useTemplate();

    useEffect(() => {
        const templateInProgress = localStorage.getItem(localStorageKeys.template);

        if (templateInProgress && !template.startTime) {
            const parsedTemplate: Workout = JSON.parse(templateInProgress!);
            setTemplate({ ...parsedTemplate, startTime: new Date(parsedTemplate.startTime!) });
        }
    }, []);


    return (
        <></>
    )
}

export default RepopulateTemplate