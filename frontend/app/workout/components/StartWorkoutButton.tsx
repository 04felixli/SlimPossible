import { cookieKeys } from '@/app/contexts/util/workoutFunctions';
import Button from '@/app/global components/Buttons/Button';
import CustomLink from '@/app/global components/CustomLink';
import { cookies } from 'next/headers';
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
            <CustomLink href="/workout/start" className='w-fit rounded-full black-button'>
                <Button text={`${!started ? 'Quick Start' : 'Resume Workout'}`} />
            </CustomLink>
        </div>
    )
}

export default StartWorkoutButton