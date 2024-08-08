"use client"
import { useWorkout } from '@/app/contexts/workoutContext';
import Button from '@/app/global components/Buttons/Button';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'

const StartWorkoutButton = () => {
    const { workout } = useWorkout();
    return (
        <div className='flex justify-center items-center mb-5 flex-col'>
            {workout?.startTime && <div className='thin-font w-fit mb-1'>There is a workout in progress:</div>}
            <Link href="/workout/start" className='w-fit rounded-full'>
                <Button text={`${!workout?.startTime ? 'Quick Start' : 'Resume Workout'}`} />
            </Link>
        </div>
    )
}

export default StartWorkoutButton