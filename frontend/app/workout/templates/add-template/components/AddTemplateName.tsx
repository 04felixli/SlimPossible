'use client'
import { useState } from "react";
import PageNameClient from "@/app/global components/PageNameClient";
import ChangeNamePopUp from "@/app/global components/ChangeNamePopUp";
import { useTemplate } from "@/app/contexts/templateContext";

const AddTemplateName = () => {
    const { template, changeName } = useTemplate();
    const [editName, setEditName] = useState<boolean>(false);

    return (
        <div>
            <PageNameClient name={template.name} changeName={setEditName} />
            {editName && <ChangeNamePopUp changeName={changeName} workout={template} showPopUp={setEditName} />}
        </div>
    )
}

export default AddTemplateName