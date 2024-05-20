import React, { useState } from 'react'
import PageLayout from '@/app/global components/layout'
import PageName from '@/app/global components/PageName'
import { GetWorkoutTime } from './lib'
import Timer from './components/Timer'
import Button from '@/app/global components/Buttons/Button'
import { handlePopUp } from '@/app/global components/lib';
import Link from 'next/link'
import ExercisesToTrackContextProvider from '../../contexts/exercisesToTrackContext'
import ExerciseTrackingCards from './components/ExerciseTrackingCards'

const start = () => {
    return (
        <PageLayout>
            <PageName name={GetWorkoutTime() + " Workout"} />
            <Timer />
            <ExerciseTrackingCards />
            <div className='flex justify-around mt-5'>
                <Link href="/workout/start/selectExercises">
                    <Button text={'Add'} />
                </Link>
                <Button text={'Finish'} />
                <Button text={'Cancel'} />
            </div>
        </PageLayout>
    )
}

export default start