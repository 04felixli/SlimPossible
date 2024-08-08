'use client'
import Button from '@/app/global components/Buttons/Button'
import React, { useState } from 'react'
import AddExercisePopUp from './popups/AddExercisePopUp';

const AddNewExerciseButton = () => {
    const [openAddExercisePopUp, setOpenAddExercisePopUp] = useState<boolean>(false);

    const closePopUp = () => {
        setOpenAddExercisePopUp(false)
    }

    return (
        <div>
            <Button text={"Create New Exercise"} onClickFunction={() => setOpenAddExercisePopUp(true)} className='max-sm:w-full' />

            {openAddExercisePopUp && <AddExercisePopUp closePopUp={closePopUp} />}
        </div>
    )
}

export default AddNewExerciseButton