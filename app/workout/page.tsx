import React from 'react'
import TemplateCards from './components/TemplateCards'
import PageName from '../global components/PageName';
import PageLayout from '../global components/layout';
import "../globals.css";
import Button from '../global components/Buttons/Button';
import Link from 'next/link';
import { GetAllWorkoutTemplatesAsync } from '../global components/Library/apiCalls';
import { IWorkoutTemplate } from '../global components/Interfaces/templateInterfaces';

const workout = async () => {
    const templates: IWorkoutTemplate[] = await GetAllWorkoutTemplatesAsync();
    const pageName: string = "Workout";

    return (
        <PageLayout>
            <PageName name={pageName} />
            <div className='flex justify-center mb-5'>
                <Link href="/workout/start">
                    <Button text={"Quick Start"} />
                </Link>
            </div>
            <div className='flex flex-row justify-between items-center'>
                <div className='subheading-font'>Templates</div>
                <Link href={'/workout/templates/add-template'}>
                    <Button text={"Add"} />
                </Link>
            </div>
            <TemplateCards templates={templates} />
        </PageLayout>
    )
}

export default workout