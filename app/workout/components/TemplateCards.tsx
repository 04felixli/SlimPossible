'use client'
import React from 'react'
import '../../globals.css';
import Link from 'next/link';
import { IWorkoutTemplate } from '@/app/global components/Interfaces/templateInterfaces';
import { useTemplate } from '@/app/contexts/templateContext';
import { convertIWorkoutTemplateToWorkout } from '@/app/global components/Library/apiCalls';
import { Workout } from '../objects/classes';

interface Props {
    templates: IWorkoutTemplate[]
}

const TemplateCards = ({ templates }: Props) => {
    const { template, setTemplate } = useTemplate();

    const handleTemplateCardClick = (rawTemplate: IWorkoutTemplate) => {
        const templateObject: Workout = convertIWorkoutTemplateToWorkout(rawTemplate)
        setTemplate(templateObject);
    }

    return (
        <div>
            <ul>
                {templates.map(template => (
                    <Link href={`/workout/templates/edit-template`} key={template.id} onClick={() => handleTemplateCardClick(template)}>
                        <li className='card-bg'>
                            <div className='flex justify-center items-center card-title-font'>{template.name}</div>
                            <ul>
                                {template.exercises.map((exercise) => (
                                    <li key={`${exercise.id} - ${exercise.insertionNumber}`} className='flex flex-row items-center mt-2 text-sm'>
                                        <div className='border mr-4 px-3 rounded-full'>{exercise.sets.length}</div>
                                        <div>{`${exercise.name} (${exercise.equipment})`}</div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </Link>

                ))}
            </ul>

        </div>
    )
}

export default TemplateCards