'use client'
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import InputField from '@/app/global components/InputField';
import PopUpLayout from '@/app/global components/popups/PopUpLayout';
import SelectDropDown from '@/app/global components/SelectDropDown';
import React, { useState } from 'react'
import { FaRegWindowClose } from 'react-icons/fa';

export interface NewOrUpdatedExercise {
    exerciseId: number;
    name: string;
    equipment: string;
    targetMuscle: string;
}

interface Props {
    exercise?: ExerciseInList;
    closePopUp: () => void;
    serverActionFunction: (newExercise: NewOrUpdatedExercise) => Promise<boolean>; // either update or create an exercise
}

const HandleExercisePopUp = ({ exercise, closePopUp, serverActionFunction }: Props) => {
    const equipmentList: string[] = ["Barbell", "Dumbbell", "Cable", "Machine", "Body Weight"];
    const targetMuscleList: string[] = ["Chest", "Back", "Legs", "Arms", "Shoulders", "Core"];

    const { id = -1, name = '', equipment = equipmentList[0], targetMuscle = targetMuscleList[0] } = exercise || {};

    const [newExercise, setNewExercise] = useState<NewOrUpdatedExercise>({ exerciseId: id, name: name, equipment: equipment, targetMuscle: targetMuscle });

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

    const hasName = () => {
        return newExercise.name === '';
    }

    const handleSubmit = async () => {
        closePopUp();
        return await serverActionFunction(newExercise);
    }

    return (
        <PopUpLayout popupContentClassName={"confirmation-popup-content"} closePopUp={closePopUp}>
            <form action={handleSubmit}>
                <section className='flex justify-between items-center'>
                    <button><FaRegWindowClose className='w-6 h-6' onClick={closePopUp} /></button>
                    <button
                        disabled={hasName()}
                        className={`${hasName() ? 'text-disabled-color' : ''}`}
                        type='submit'
                    >
                        {name ? "Save" : "Add"}
                    </button>
                </section>
                <div className='flex justify-center items-center card-title-font mt-3'>{name !== '' ? `Editing "${name}"` : 'New Exercise'}</div>
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
            </form>
        </PopUpLayout>
    )
}

export default HandleExercisePopUp