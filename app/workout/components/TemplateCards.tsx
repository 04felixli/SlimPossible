'use client'
import React, { useEffect, useState } from 'react'
import '../../globals.css';
import Link from 'next/link';
import { IWorkoutTemplate } from '@/app/global components/Interfaces/templateInterfaces';
import { useTemplate } from '@/app/contexts/templateContext';
import { Workout } from '../objects/classes';
import { convertIWorkoutTemplateToWorkout, setLocalStorage } from '@/app/global components/Library/utilFunctions';
import TemplatePreviewCard from './popups/TemplatePreviewCard';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

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
    const [templateList, setTemplateList] = useState<IWorkoutTemplate[]>(templates);
    const [templatePreviewCard, setTemplatePreviewCard] = useState<TemplatePreviewCardState>(initialState);

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

    const handleOnDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        setTemplateList(prevList => {
            const copy = [...prevList];
            const [reorderedListItem] = copy.splice(result.source.index, 1);
            copy.splice(result.destination.index, 0, reorderedListItem);
            const updatedList = [...copy];
            setLocalStorage('template list order', updatedList.map(template => template.id));
            return updatedList;
        })
    }

    useEffect(() => {
        // Retrieve and parse the order from local storage
        const orderString = localStorage.getItem('template list order');
        if (!orderString) {
            return;
        }

        const order: number[] = JSON.parse(orderString);

        const sortedTemplates = [...templateList].sort((a, b) => {
            const indexA = order.indexOf(a.id);
            const indexB = order.indexOf(b.id);
            return indexA - indexB;
        });

        setTemplateList(sortedTemplates);
    }, []);

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='templates list'>
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {templateList.map((template, index) => (
                                <Draggable key={template.id} draggableId={String(template.id)} index={index}>
                                    {(provided) => (
                                        <li onClick={() => handleTemplateCardClick(template)} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
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
                                    )}

                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            {templatePreviewCard.isOpen && <TemplatePreviewCard workout={templatePreviewCard.workout} closePopUp={closePopUp} />}
        </div>
    )
}

export default TemplateCards