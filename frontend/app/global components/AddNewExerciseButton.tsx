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
            <div className='black-button'>
                <Button text={"Create New Exercise"} onClickFunction={() => setOpenAddExercisePopUp(true)} className='max-sm:w-full' />
            </div>

            {openAddExercisePopUp && <AddExercisePopUp closePopUp={closePopUp} />}
        </div>
    )
}

export default AddNewExerciseButton