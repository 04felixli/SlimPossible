import InputField from '@/app/global components/InputField';
import PopUpLayout from '@/app/global components/popups/PopUpLayout';
import SelectDropDown from '@/app/global components/SelectDropDown';
import React, { useState } from 'react'
import { FaRegWindowClose } from 'react-icons/fa';

interface Props {
    closePopUp: () => void;
}

interface NewExercise {
    name: string;
    equipment: string;
    targetMuscle: string;
}

const AddExercisePopUp = ({ closePopUp }: Props) => {
    const equipmentList: string[] = ["Barbell", "Dumbell", "Cable", "Machine", "Body Weight"];
    const targetMuscleList: string[] = ["Chest", "Back", "Legs", "Arms", "Shoulders", "Core"];

    const [newExercise, setNewExercise] = useState<NewExercise>({ name: '', equipment: equipmentList[0], targetMuscle: targetMuscleList[0] });


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewExercise(prevExercise => {
            return { ...prevExercise, name: e.target.value };
        })
    }

    const handleEquipmentSelect = (equipment: string) => {
        setNewExercise(prevExercise => {
            return { ...prevExercise, equipment: equipment };
        })
    }

    const handleTargetMuscleSelect = (targetMuscle: string) => {
        setNewExercise(prevExercise => {
            return { ...prevExercise, targetMuscle: targetMuscle };
        })
    }

    const addButtonDisabled = () => {
        return newExercise.name === '';
    }

    return (
        <PopUpLayout closePopUp={closePopUp}>
            <section className='flex justify-between items-center'>
                <button><FaRegWindowClose className='w-6 h-6' onClick={closePopUp} /></button>
                <button
                    disabled={addButtonDisabled()}
                    // onClick={handleChangeTime}
                    className={`${addButtonDisabled() ? 'text-disabled-color' : ''}`}
                >
                    Add
                </button>
            </section>
            <div className='flex justify-center items-center card-title-font mt-3'>New Exercise</div>
            <InputField
                name='Add exercise input field'
                placeHolder='New Exercise Name'
                value={newExercise.name}
                onChange={handleNameChange}
                className='max-w-xs bg-darkest-color rounded-md py-1 px-2 h-full w-full mt-5 text-left'
            />
            <div className='flex flex-col justify-between mt-5'>
                <SelectDropDown items={equipmentList} selected={newExercise.equipment} setSelectedFunction={handleEquipmentSelect} className='w-full' />
                <SelectDropDown items={targetMuscleList} selected={newExercise.targetMuscle} setSelectedFunction={handleTargetMuscleSelect} className='mt-1' />
            </div>


        </PopUpLayout>
    )
}

export default AddExercisePopUp