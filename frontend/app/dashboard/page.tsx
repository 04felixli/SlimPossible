import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';
import PageLayout from '../global components/PageLayouts/layout';
import { GetDashboardInfo } from '../global components/Library/apiCalls';
import { formatTotalWorkoutsDuration, GetWorkoutTime } from '../global components/Library/utilFunctions';
import PageName from '../global components/PageName';
import StartWorkoutButton from '../workout/components/StartWorkoutButton';

export interface IDashboardInfo {
    totalWorkouts: number;
    totalTime: number;
    totalVolume: number;
    avgWorkoutDuration: number;
    avgWorkoutVolume: number;
}

const dashboard = async () => {
    const data: IDashboardInfo = await GetDashboardInfo();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <PageLayout activePage='/dashboard'>
            <PageName name="Dashboard" />
            <h1 className='text-3xl flex justify-center items-center'>
                Good {GetWorkoutTime()}, {user?.given_name}
            </h1>
            <div className='flex flex-col justify-center items-center mt-5'>
                <StartWorkoutButton />
            </div>

            <h3 className='text-xl font-semibold mt-10 border-t-2 pt-5'>Your Statistics:</h3>
            <ul className='grid grid-cols-2 gap-4 mt-5'>
                <li className='flex flex-col justify-center items-center p-4 bg-gray-900 rounded-3xl'>
                    <span className='card-title-font'>Total Workouts:</span>
                    <span>{data.totalWorkouts}</span>
                </li>
                <li className='flex flex-col justify-center items-center p-4 bg-gray-900 rounded-3xl'>
                    <span className='card-title-font'>Total Workout Time:</span>
                    <span>{formatTotalWorkoutsDuration(data.totalTime)}</span>
                </li>
                <li className='flex flex-col justify-center items-center p-4 bg-gray-900 rounded-3xl'>
                    <span className='card-title-font'>Average Volume Per Workout:</span>
                    <span>{data.avgWorkoutVolume}</span>
                </li>
                <li className='flex flex-col justify-center items-center p-4 bg-gray-900 rounded-3xl'>
                    <span className='card-title-font'>Average Duration Per Workout:</span>
                    <span>{formatTotalWorkoutsDuration(data.avgWorkoutDuration)}</span>
                </li>
            </ul>
        </PageLayout>


    )
}

export default dashboard