'use client'
import Button from '@/app/global components/Buttons/Button'
import React, { useState } from 'react'
import AddExercisePopUp from './PopUps/AddExercisePopUp';

const AddNewExerciseButton = () => {
    const [openAddExercisePopUp, setOpenAddExercisePopUp] = useState<boolean>(false);

    const closePopUp = () => {
        console.log("closing pop up")
        setOpenAddExercisePopUp(false)
    }

    return (
        <div>
            <Button text={"Create New Exercise"} onClickFunction={() => setOpenAddExercisePopUp(true)} />

            {openAddExercisePopUp && <AddExercisePopUp closePopUp={closePopUp} />}
        </div>
    )
}

export default AddNewExerciseButton