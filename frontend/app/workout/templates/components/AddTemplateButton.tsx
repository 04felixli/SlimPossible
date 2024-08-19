"use client"
import { useTemplate } from '@/app/contexts/templateContext';
import Button from '@/app/global components/Buttons/Button';
import CustomLink from '@/app/global components/CustomLink';
import React from 'react';

const AddTemplateButton = () => {
    const { startTemplate } = useTemplate();
    return (
        <CustomLink href={'/workout/templates/add-template'} onClick={() => startTemplate()} className='black-button'>
            <Button text={"Add"} />
        </CustomLink>
    )
}

export default AddTemplateButton