'use client'
import { useHistory } from "@/app/contexts/historyContext";
import { useState } from "react";
import PageNameClient from "@/app/global components/PageNameClient";
import ChangeNamePopUp from "@/app/global components/ChangeNamePopUp";

const WorkoutHistoryName = () => {
    const { history, changeName } = useHistory();
    const [editName, setEditName] = useState<boolean>(false);

    return (
        <div>
            <PageNameClient name={history.name} changeName={setEditName} />
            {editName && <ChangeNamePopUp changeName={changeName} workout={history} showPopUp={setEditName} />}
        </div>
    )
}

export default WorkoutHistoryName