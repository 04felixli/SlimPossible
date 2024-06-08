'use client'
import { useTemplate } from '@/app/contexts/templateContext'
import React from 'react'
import PageName from '@/app/global components/PageName';

const ExistingTemplateName = () => {
    const { template, setTemplate } = useTemplate();
    return (
        <PageName name={template.name} />
    )
}

export default ExistingTemplateName