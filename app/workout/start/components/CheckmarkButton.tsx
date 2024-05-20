import { useExercisesToTrack } from '@/app/contexts/exercisesToTrackContext';
import React from 'react'
import { FaCheck } from 'react-icons/fa'

interface Props {
    exerciseId: number
    setNumber: number
}

const CheckmarkButton = ({ exerciseId, setNumber }: Props) => {
    const { exercisesToTrack, setExercisesToTrack } = useExercisesToTrack();

    const handleCompletedSet = () => {
        setExercisesToTrack(prevExercises => {
            return prevExercises.map(exercise => {
                if (exercise.id === exerciseId) {
                    const updatedSets = exercise.sets.map(set => {
                        if (set.setNumber === setNumber) {
                            return { ...set, isCompleted: !set.isCompleted };
                        }
                        return set;
                    });
                    return { ...exercise, sets: updatedSets };
                }
                return exercise;
            });
        });
    }

    return (
        <div>
            <button className='border p-1 rounded-full'>
                <FaCheck />
            </button>
        </div>
    )
}

export default CheckmarkButton