'use client'
import React from 'react'
import { Workout } from '@/app/workout/objects/classes';
import { FaRegWindowClose } from "react-icons/fa";
import Link from 'next/link';
import { useTemplate } from '@/app/contexts/templateContext';
import PopUpLayout from '@/app/global components/popups/PopUpLayout';
import Button from '@/app/global components/Buttons/Button';
import { useWorkout } from '@/app/contexts/workoutContext';


interface Props {
    workout?: Workout;
    closePopUp: () => void;
}

const TemplatePreviewCard = ({ workout, closePopUp }: Props) => {
    const { setTemplate } = useTemplate();
    const { setWorkout } = useWorkout();

    // Should never happen 
    if (!workout) {
        return (<></>);
    }

    return (
        <PopUpLayout closePopUp={closePopUp} className='w-6/12'>
            {/* x and edit buttons */}
            <section className='flex justify-between items-center'>
                <button><FaRegWindowClose className='w-6 h-6' onClick={closePopUp} /></button>
                <Link href={`/workout/templates/edit-template`} onClick={() => setTemplate(JSON.parse(JSON.stringify(workout)))}>Edit</Link>
            </section>

            {/* workout name */}
            <div className='card-title-font items-center flex justify-center'>{workout.name}</div>

            {/* start workout from template button */}
            <div className='flex justify-center items-center mt-3'>
                <Link href='/workout/start' onClick={() => setWorkout(JSON.parse(JSON.stringify(workout)))}>
                    <Button text='Start Workout' />
                </Link>
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
                                    <div>{`${set.weight} ${exercise.weightUnit} x ${set.reps}`}</div>
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