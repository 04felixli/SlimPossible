'use client'
import { useHistory } from "@/app/contexts/historyContext";
import PageName from "@/app/global components/PageName";
import { useState } from "react";
import EditNamePopUp from "../../components/popups/EditNamePopUp";
import PageNameClient from "@/app/global components/PageNameClient";

const WorkoutHistoryName = () => {
    const { history, setHistory } = useHistory();
    const [editName, setEditName] = useState<boolean>(false);

    return (
        <div>
            <PageNameClient name={history.name} changeName={setEditName} />
            {editName && <EditNamePopUp showPopUp={setEditName} />}
        </div>
    )
}

export default WorkoutHistoryName