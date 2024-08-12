import React from 'react'
import PageLayout from '../global components/PageLayouts/layout'
import PageName from '../global components/PageName'
import Button from '../global components/Buttons/Button'
import HistoryCards from './components/HistoryCards'
import { GetAllWorkoutHistoryAsync } from '../global components/Library/apiCalls'
import { IWorkoutHistory } from '../global components/Interfaces/historyInterfaces'

const history = async () => {
    const workoutHistories: IWorkoutHistory[] = await GetAllWorkoutHistoryAsync();
    const pageName: string = "History";

    return (
        <PageLayout activePage='/history'>
            <PageName name={pageName} />
            <div className='flex justify-center mb-5 black-button'>
                <Button text={"Calendar View"} />
            </div>
            <HistoryCards workoutHistories={workoutHistories} />
        </PageLayout>
    )
}

export default history