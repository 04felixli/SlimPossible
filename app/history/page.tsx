import React from 'react'
import PageLayout from '../global components/layout'
import PageName from '../global components/PageName'
import Button from '../global components/Buttons/Button'
import { WorkoutHistory } from './interfaces/history'
import HistoryCards from './components/HistoryCards'
import { GetAllWorkoutHistoryAsync } from '../global components/Library/apiCalls'

const history = async () => {
    const workoutHistories: WorkoutHistory[] = await GetAllWorkoutHistoryAsync();
    const pageName: string = "History";

    return (
        <PageLayout>
            <PageName name={pageName} />
            <div className='flex justify-center mb-5'>
                <Button text={"Calendar View"} />
            </div>
            <HistoryCards workoutHistories={workoutHistories} />
        </PageLayout>
    )
}

export default history