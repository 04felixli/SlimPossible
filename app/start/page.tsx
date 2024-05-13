import React from 'react'
import PageLayout from '../global components/layout'
import PageName from '../global components/PageName'
import { GetWorkoutTime } from './lib'

const start = () => {
    return (
        <PageLayout>
            <PageName name={GetWorkoutTime() + " Workout"} />
            <div>oh hello!</div>
        </PageLayout>
    )
}

export default start