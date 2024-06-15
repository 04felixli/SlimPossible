'use client'
import React, { useState, Dispatch, SetStateAction } from 'react';
import { useHistory } from '@/app/contexts/historyContext';
import { FaRegWindowClose } from 'react-icons/fa';

interface Props {
    showPopUp: Dispatch<SetStateAction<boolean>>;
}

const EditNamePopUp = ({ showPopUp }: Props) => {
    const { history, setHistory } = useHistory();
    const [newName, setNewName] = useState<string>(''); // State for new name

    const closePopUp = () => {
        showPopUp(false);
    }

    const changeName = () => {
        if (newName.trim()) { // Only change name if newName is not empty
            setHistory(prevHistory => {
                return { ...prevHistory, name: newName };
            });
        }
        closePopUp(); // Close popup after changing the name
    }

    return (
        <div className='popup-overlay hover:cursor-pointer z-50' onClick={closePopUp}>
            <div className='popup-content hover:cursor-default w-10/12' onClick={(e) => e.stopPropagation()}>
                {/* x and edit buttons */}
                <section className='flex justify-between items-center'>
                    <button><FaRegWindowClose className='w-6 h-6' onClick={closePopUp} /></button>
                    <button onClick={changeName}>Change</button>
                </section>
                <div className='mt-3'>
                    <span className='card-title-font'>Old Name: </span>
                    {history.name}
                </div>
                <input
                    type='text'
                    placeholder='New Name'
                    value={newName} // Bind input value to newName state
                    onChange={(e) => setNewName(e.target.value)} // Update newName state on input change
                    className='bg-transparent focus:outline-none border-b w-full overflow-hidden mt-5 shadow-md'
                />
            </div>
        </div>
    )
}

export default EditNamePopUp;
