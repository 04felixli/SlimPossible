import { cookieKeys, localStorageKeys } from '@/app/contexts/util/workoutFunctions';
import Button from '@/app/global components/Buttons/Button';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'

const StartWorkoutButton = () => {
    // Access the cookies object
    const cookiesObject = cookies();

    // Get a specific cookie by name
    const started = cookiesObject.get(cookieKeys.workout);

    return (
        <div className='flex justify-center items-center mb-5 flex-col'>
            {started ?
                <div className='thin-font w-fit mb-1'>There is a workout in progress:</div> :
                <div className='thin-font w-fit mb-1'>Start a new workout:</div>
            }
            <Link href="/workout/start" className='w-fit rounded-full black-button'>
                <Button text={`${!started ? 'Quick Start' : 'Resume Workout'}`} />
            </Link>
        </div>
    )
}

export default StartWorkoutButton