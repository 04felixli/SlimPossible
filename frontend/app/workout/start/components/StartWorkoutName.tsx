'use client'
import { useState } from "react";
import PageNameClient from "@/app/global components/PageNameClient";
import ChangeNamePopUp from "@/app/global components/ChangeNamePopUp";
import { useWorkout } from "@/app/contexts/workoutContext";

const StartWorkoutName = () => {
    const { workout, changeName } = useWorkout();
    const [editName, setEditName] = useState<boolean>(false);

    return (
        <div>
            <PageNameClient name={workout.name} changeName={setEditName} />
            {editName && <ChangeNamePopUp changeName={changeName} workout={workout} showPopUp={setEditName} />}
        </div>
    )
}

export default StartWorkoutName