'use client'
import React from 'react';
import { Workout } from '@/app/global components/objects/classes';
import { FaRegWindowClose } from "react-icons/fa";
import { useTemplate } from '@/app/contexts/templateContext';
import PopUpLayout, { popupContentClassNames } from '@/app/global components/popups/PopUpLayout';
import Button from '@/app/global components/Buttons/Button';
import { useWorkout } from '@/app/contexts/workoutContext';
import CustomLink from '@/app/global components/CustomLink';
import { getClientSideCookie } from '@/app/global components/Library/utilFunctions';
import { cookieKeys } from '@/app/contexts/util/workoutFunctions';


interface Props {
    workout?: Workout;
    closePopUp: () => void;
}

const TemplatePreviewCard = ({ workout, closePopUp }: Props) => {
    const { startTemplate } = useTemplate();
    const { setWorkout } = useWorkout();

    // Should never happen 
    if (!workout) {
        return (<></>);
    }

    const ableToEdit = getClientSideCookie(cookieKeys.isEditTemplate) === undefined ? true : false;

    return (
        <PopUpLayout closePopUp={closePopUp} popupContentClassName={popupContentClassNames.previewCard}>
            {/* x and edit buttons */}
            <section className='flex justify-between items-center'>
                <button><FaRegWindowClose className='w-6 h-6' onClick={closePopUp} /></button>
                <button onClick={() => startTemplate(`/workout/templates/edit-template`, JSON.parse(JSON.stringify(workout)))} disabled={!ableToEdit} className={`${ableToEdit ? '' : 'text-disabled-color cursor-not-allowed'}`}>Edit</button>
            </section>

            {/* workout name */}
            <div className='card-title-font items-center flex justify-center'>
                <span className='truncate max-w-full'>
                    {workout.name}
                </span>
            </div>

            {/* start workout from template button */}
            <div className='flex justify-center items-center mt-3'>
                <CustomLink href='/workout/start' onClick={() => setWorkout(JSON.parse(JSON.stringify(workout)))} className='black-button'>
                    <Button text='Start Workout' />
                </CustomLink>
            </div>

            {/* list of exercises and sets in workout */}
            <ul className='mt-5'>
                {workout.exercises.map((exercise, index) => (
                    <li key={`${exercise.id} - ${exercise.insertionNumber}`} className={`flex flex-col ${index != 0 ? 'mt-2' : ''}`}>
                        <div>{`${exercise.name} (${exercise.equipment})`}</div>
                        <ul>
                            {exercise.sets.map((set) => (
                                <li key={`${set.setNumber}`} className='flex flex-row'>
                                    <div className={`px-2`}>{`${set.setNumber})`}</div>
                                    <div>{`${set.weight >= 0 ? set.weight : '____'} ${exercise.weightUnit} x ${set.reps > 0 ? set.reps : '____'}`}</div>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </PopUpLayout>
    )
}

export default TemplatePreviewCard