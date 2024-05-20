import { useExercisesToTrack } from '@/app/contexts/exercisesToTrackContext';
import React, { useState } from 'react';

interface Props {
  exerciseId: number;
  setNumber: number;
  weightUnit: string;
  inputField: boolean; // True for weight input and false for rep input
  isCompleted: boolean;
}

const NumericInput = ({ exerciseId, setNumber, weightUnit, inputField, isCompleted }: Props) => {
  const input = inputField ? weightUnit : "Reps";

  const { exercisesToTrack, setExercisesToTrack } = useExercisesToTrack();

  const handleWeightInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = parseFloat(event.target.value);
    setExercisesToTrack(prevExercises => {
      return prevExercises.map(exercise => {
        if (exercise.id === exerciseId) {
          const updatedSets = exercise.sets.map(set => {
            if (set.setNumber === setNumber) {
              return { ...set, weight: newWeight };
            }
            return set;
          });
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });
    });
  };

  const handleRepInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newReps = parseInt(event.target.value, 10);
    setExercisesToTrack(prevExercises => {
      return prevExercises.map(exercise => {
        if (exercise.id === exerciseId) {
          const updatedSets = exercise.sets.map(set => {
            if (set.setNumber === setNumber) {
              return { ...set, reps: newReps };
            }
            return set;
          });
          return { ...exercise, sets: updatedSets };
        }
        return exercise;
      });
    });
  };

  return (
    <input
      type="number"
      className={`input input-bordered max-w-xs bg-card-bg-gradient-dark rounded-full py-1 h-full w-full leading-tight ${isCompleted ? "bg-green-300" : ''}`}
      onChange={inputField ? handleWeightInput : handleRepInput}
    />
  );
};

export default NumericInput;
