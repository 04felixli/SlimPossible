import React from 'react'
import PageLayout from '@/app/global components/layout'
import PageName from '@/app/global components/PageName'
import Timer from './components/Timer'
import Button from '@/app/global components/Buttons/Button'
import Link from 'next/link'
import ExerciseTrackingCards from './components/ExerciseTrackingCards'
import { GetWorkoutTime } from '@/app/global components/Library/utilFunctions'

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