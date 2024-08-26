"use client"
import { useTemplate } from '@/app/contexts/templateContext';
import { cookieKeys } from '@/app/contexts/util/workoutFunctions';
import Button from '@/app/global components/Buttons/Button';
import CustomLink from '@/app/global components/CustomLink';
import { getClientSideCookie } from '@/app/global components/Library/utilFunctions';
import React from 'react';

const AddTemplateButton = () => {
    const { startTemplate } = useTemplate();
    const isEditTemplate = getClientSideCookie(cookieKeys.isEditTemplate);

    if (isEditTemplate === undefined) {
        return (
            <div className='flex flex-row justify-between items-center'>
                <div className='subheading-font'>Templates</div>
                <div className='black-button'>
                    <Button text={"Add"} onClickFunction={() => startTemplate('/workout/templates/add-template')} />
                </div>
            </div>
        )
    }

    if (isEditTemplate === 'false') {
        return (
            <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='subheading-font'>Templates</div>
                <div className='flex flex-col md:flex-row items-center justify-center'>
                    <p className='font-thin md:mr-2 text-sm'>You are currently creating a template:</p>
                    <CustomLink href={'/workout/templates/add-template'} className='black-button'>
                        <Button text={"Resume"} />
                    </CustomLink>
                </div>
            </div>
        )
    }

    if (isEditTemplate === 'true') {
        return (
            <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='subheading-font'>Templates</div>
                <div className='flex flex-col md:flex-row items-center justify-center'>
                    <p className='font-thin md:mr-2 text-sm'>You are currently editing a template:</p>
                    <CustomLink href={'/workout/templates/edit-template'} className='black-button'>
                        <Button text={"Resume"} />
                    </CustomLink>
                </div>
            </div>
        )
    }
}

export default AddTemplateButton