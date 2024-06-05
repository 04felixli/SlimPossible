import React from 'react'
import '../../globals.css';
import Link from 'next/link';
import { IWorkoutTemplate } from '@/app/global components/Interfaces/templateInterfaces';

interface Props {
    templates: IWorkoutTemplate[]
}

const TemplateCards = ({ templates }: Props) => {

    return (
        <div>
            <ul>
                {templates.map(template => (
                    <Link href={`/workout/templates/edit-template?id=${template.id}`} key={template.id}>
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