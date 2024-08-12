'use client'
import { useTemplate } from '@/app/contexts/templateContext'
import React, { useState } from 'react'
import PageName from '@/app/global components/PageName';
import PageNameClient from '@/app/global components/PageNameClient';
import ChangeNamePopUp from '@/app/global components/ChangeNamePopUp';

const ExistingTemplateName = () => {
    const { template, changeName } = useTemplate();
    const [editName, setEditName] = useState<boolean>(false);

    return (
        <div>
            <PageNameClient name={template.name} changeName={setEditName} />
            {editName && <ChangeNamePopUp changeName={changeName} workout={template} showPopUp={setEditName} />}
        </div>
    )
}

export default ExistingTemplateName; 