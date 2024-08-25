'use client'
import { ExerciseInList } from '@/app/exercises/interfaces/exercises';
import InputField from '@/app/global components/InputField';
import PopUpLayout from '@/app/global components/popups/PopUpLayout';
import SelectDropDown from '@/app/global components/SelectDropDown';
import React, { useState } from 'react'
import { FaRegWindowClose } from 'react-icons/fa';
import Button from '../Buttons/Button';
import { HandleExerciseServerAction } from '../Library/actions';

export interface NewOrUpdatedExercise {
    exerciseId: number;
    name: string;
    equipment: string;
    targetMuscle: string;
    isHidden: boolean;
}

interface Props {
    exercise?: ExerciseInList;
    closePopUp: () => void;
    serverActionFunction: (newExercise: NewOrUpdatedExercise) => Promise<boolean>; // either update or create an exercise
}

const HandleExercisePopUp = ({ exercise, closePopUp, serverActionFunction }: Props) => {
    const equipmentList: string[] = ["Barbell", "Dumbbell", "Cable", "Machine", "Body Weight"];
    const targetMuscleList: string[] = ["Chest", "Back", "Legs", "Arms", "Shoulders", "Core"];

    const { id = -1, name = '', equipment = equipmentList[0], targetMuscle = targetMuscleList[0], isCustom = true, isHidden = false } = exercise || {};

    const [newExercise, setNewExercise] = useState<NewOrUpdatedExercise>({ exerciseId: id, name: name, equipment: equipment, targetMuscle: targetMuscle, isHidden: isHidden });

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

    return (
        <PopUpLayout popupContentClassName={"confirmation-popup-content"} closePopUp={closePopUp}>
            <form action={async FormData => {
                await HandleExerciseServerAction(FormData, newExercise);
                closePopUp();
            }}>
                <section className='flex justify-between items-center'>
                    <button><FaRegWindowClose className='w-6 h-6' onClick={closePopUp} /></button>
                    <button
                        name='action-button'
                        disabled={hasName()}
                        className={`${hasName() ? 'text-disabled-color' : ''}`}
                        type='submit'
                        value={name ? "save" : "add"}
                    >
                        {name ? "Save" : "Add"}
                    </button>
                </section>
                <div className='flex justify-center items-center card-title-font mt-3'>{`${name !== '' ? `Edit or Hide "${name}"` : "New Exercise"}`}</div>
                <p className='font-thin text-sm flex justify-center items-center'>Note: You can only edit custom exercises</p>
                <div className='flex justify-center items-center mt-5'>
                    <input
                        autoFocus
                        type="text"
                        name='exercise-name-input-field'
                        placeholder='New Exercise Name'
                        value={newExercise.name}
                        onChange={handleNameChange}
                        className={`max-w-xl bg-darkest-color rounded-md py-3 px-2 h-full w-full text-left ${!isCustom ? 'cursor-not-allowed text-disabled-color' : ''}`}
                        disabled={!isCustom}
                    />
                </div>
                <div className='flex flex-col justify-between mt-5'>
                    <SelectDropDown name='equipment-dropdown' items={equipmentList} selected={newExercise.equipment} setSelectedFunction={handleEquipmentSelect} className={`w-full`} disabled={!isCustom} />
                    <SelectDropDown name='target-muscle-dropdown' items={targetMuscleList} selected={newExercise.targetMuscle} setSelectedFunction={handleTargetMuscleSelect} className={`mt-1`} disabled={!isCustom} />
                </div>
                {name !== '' && <Button text={`${isHidden ? 'Unhide Exercise' : 'Hide Exercise'}`} className='w-full py-2 mt-5' name='update-hidden-status-button' value='updateHide' />}
            </form>
        </PopUpLayout>
    )
}

export default HandleExercisePopUp