"use client"
import { useTemplate } from '@/app/contexts/templateContext'
import Button from '@/app/global components/Buttons/Button'
import Link from 'next/link'
import React from 'react'

const AddTemplateButton = () => {
    const { startTemplate } = useTemplate();
    return (
        <Link href={'/workout/templates/add-template'} onClick={() => startTemplate()} className='black-button'>
            <Button text={"Add"} />
        </Link>
    )
}

export default AddTemplateButton