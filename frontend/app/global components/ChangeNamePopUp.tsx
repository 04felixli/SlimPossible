'use client'
import React, { useState, Dispatch, SetStateAction } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import PopUpLayout, { popupContentClassNames } from '@/app/global components/popups/PopUpLayout';
import { Workout } from './objects/classes';

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
            <div className='mt-3 flex justify-center items-center flex-col'>
                <h3 className='card-title-font mr-1'>Old Name: </h3>
                <p className='text-ellipsis overflow-hidden whitespace-nowrap max-w-full'>{workout.name}</p>
            </div>
            <div className='flex justify-center items-center mt-5'>
                <input
                    autoFocus
                    type="text"
                    name='exercise-name-input-field'
                    placeholder='New Name'
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className={`max-w-xl bg-darkest-color rounded-md py-3 px-2 h-full w-full text-left`}
                />
            </div>
        </PopUpLayout>

    )
}

export default ChangeNamePopUp;
