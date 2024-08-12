'use client'
import React, { useState, Dispatch, SetStateAction } from 'react';
import { useHistory } from '@/app/contexts/historyContext';
import { FaRegWindowClose } from 'react-icons/fa';
import PopUpLayout, { popupContentClassNames } from '@/app/global components/popups/PopUpLayout';
import { Workout } from '../workout/objects/classes';

interface Props {
    workout: Workout;
    changeName: (newName: string) => void;
    showPopUp: Dispatch<SetStateAction<boolean>>;
}

const ChangeNamePopUp = ({ workout, changeName, showPopUp }: Props) => {
    const [newName, setNewName] = useState<string>(''); // State for new name

    const closePopUp = () => {
        showPopUp(false);
    }

    const handleChangeName = () => {
        if (newName.trim()) { // Only change name if newName is not empty
            changeName(newName);
        }
        closePopUp(); // Close popup after changing the name
    }

    return (
        <PopUpLayout closePopUp={closePopUp} popupContentClassName={popupContentClassNames.previewCard}>
            {/* x and edit buttons */}
            <section className='flex justify-between items-center'>
                <button><FaRegWindowClose className='w-6 h-6' onClick={closePopUp} /></button>
                <button onClick={handleChangeName}>Change</button>
            </section>
            <div className='mt-3'>
                <span className='card-title-font'>Old Name: </span>
                {workout.name}
            </div>
            <input
                name='name'
                type='text'
                placeholder='New Name'
                value={newName} // Bind input value to newName state
                onChange={(e) => setNewName(e.target.value)} // Update newName state on input change
                className='bg-transparent focus:outline-none border-b w-full overflow-hidden mt-5 shadow-md'
            />
        </PopUpLayout>

    )
}

export default ChangeNamePopUp;
