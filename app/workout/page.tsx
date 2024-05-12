import React from 'react'
import TemplateCards from './components/TemplateCards'
import { WorkoutTemplate } from './interfaces/templates';
import { ResponseGetAllWorkoutTemplates } from './interfaces/apiInterfaces';
import { GetAllWorkoutTemplatesAsync } from './lib';
import PageName from '../global components/PageName';
import PageLayout from '../global components/layout';
import "../globals.css";
import TemplateSubheading from './components/TemplateSubheading';
import Button from '../global components/Buttons/Button';
import MobileNavBar from '../global components/MobileNavBar';
// import Button from '../global components/Buttons/Button';

const workout = async () => {
    const templates: WorkoutTemplate[] = await GetAllWorkoutTemplatesAsync();
    const pageName: string = "Workout";

    return (
        <PageLayout>
            <PageName name={pageName} />
            <div className='flex justify-center mb-5'>
                <Button text={"Quick Start"} />
            </div>
            <TemplateSubheading />
            <TemplateCards templates={templates} />
        </PageLayout>
    )
}

export default workout