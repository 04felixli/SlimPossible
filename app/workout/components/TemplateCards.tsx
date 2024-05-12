import React from 'react'
import { WorkoutTemplate } from '../interfaces/templates';
import '../../globals.css';

interface Props {
    templates: WorkoutTemplate[]
}

const TemplateCards = (props: Props) => {
    return (
        <div>
            <ul>
                {props.templates.map((template) => (
                    <li key={template.id} className='card-bg'>
                        <div className='flex justify-center items-center card-title-font'>{template.name}</div>
                        <ul>
                            {template.exercises.map((exercise) => (
                                <li key={exercise.id} className='flex flex-row items-center mt-2 text-sm'>
                                    <div className='border mr-4 px-3 rounded-full'>{exercise.sets.length}</div>
                                    <div>{`${exercise.name} (${exercise.equipment})`}</div>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TemplateCards