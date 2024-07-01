'use client'
import React, { useState } from 'react'
import '../../globals.css';
import Link from 'next/link';
import { IWorkoutTemplate } from '@/app/global components/Interfaces/templateInterfaces';
import { useTemplate } from '@/app/contexts/templateContext';
import { Workout } from '../objects/classes';
import { convertIWorkoutTemplateToWorkout } from '@/app/global components/Library/utilFunctions';
import TemplatePreviewCard from './popups/TemplatePreviewCard';

interface Props {
    templates: IWorkoutTemplate[]
}

interface TemplatePreviewCardState {
    // if isOpen == true, workout must be defined
    isOpen: boolean;
    workout: Workout | undefined;
}

const initialState: TemplatePreviewCardState = {
    isOpen: false,
    workout: undefined,
};


const TemplateCards = ({ templates }: Props) => {
    const { setTemplate } = useTemplate();
    const [templatePreviewCard, setTemplatePreviewCard] = useState<TemplatePreviewCardState>(initialState);

    // const handleTemplateCardClick = (rawTemplate: IWorkoutTemplate) => {
    //     const templateObject: Workout = convertIWorkoutTemplateToWorkout(rawTemplate)
    //     setTemplate(templateObject);
    // }


    const handleTemplateCardClick = (rawTemplate: IWorkoutTemplate) => {
        const templateObject: Workout = convertIWorkoutTemplateToWorkout(rawTemplate)

        // Open workout history preview card
        setTemplatePreviewCard(prevState => {
            return { ...prevState, isOpen: true, workout: templateObject }
        })
    }

    const closePopUp = () => {
        // Close workout history preview card and reset workout
        setTemplatePreviewCard(prevState => {
            return { ...prevState, isOpen: false, workout: undefined }
        })
    }

    return (
        <div>
            <ul>
                {templates.map(template => (
                    <li key={template.id} onClick={() => handleTemplateCardClick(template)}>
                        <div className='card-bg'>
                            <div className='flex justify-center items-center card-title-font'>{template.name}</div>
                            <ul>
                                {template.exercises.map((exercise) => (
                                    <li key={`${exercise.id} - ${exercise.insertionNumber}`} className='flex flex-row items-center mt-2 text-sm'>
                                        <div className='border mr-4 px-3 rounded-full'>{exercise.sets.length}</div>
                                        <div>{`${exercise.name} (${exercise.equipment})`}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>

                ))}
            </ul>
            {templatePreviewCard.isOpen && <TemplatePreviewCard workout={templatePreviewCard.workout} closePopUp={closePopUp} />}
        </div>
    )
}

export default TemplateCards