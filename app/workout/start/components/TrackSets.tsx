import React from 'react'
import { Exercise } from '../objects/classes'
import NumericInput from './NumericInput';
import { FaCheck } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { useExercisesToTrack } from '@/app/contexts/exercisesToTrackContext';

interface Props {
  exercise: Exercise;
}

const TrackSets = ({ exercise }: Props) => {
  const { exercisesToTrack, setExercisesToTrack } = useExercisesToTrack();

  const handleCompletedSet = (exerciseId: number, setNumber: number) => {
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

  const handleWeightInput = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number) => {
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

  const handleRepInput = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number) => {
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

  const preventInvalidInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const validKeys = [
      'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'
    ];
    if (
      !validKeys.includes(event.key) && // Allow control keys
      !(event.key >= '0' && event.key <= '9') // Allow digits 0-9
    ) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <div className='flex flex-row justify-between items-center'>
        <div>Set</div>
        <div>Previous</div>
        <div>{exercise.weightUnit}</div>
        <div>Reps</div>
        <div><FaCheck /></div>
      </div>
      <ul>
        {exercise.sets.map((set) => (
          <li key={set.setNumber}>
            <div className={`flex flex-row justify-between items-center rounded-sm px-2 py-1 ${set.isCompleted ? 'bg-green-400' : ''}`}>
              <div className='px-3 rounded-full border'>{set.setNumber}</div>
              <div className='thin-font'>210 {exercise.weightUnit} * 10</div>

              {/* input field for weight */}
              <div className='w-2/12 flex justify-center'>
                <input
                  type="number"
                  className={`input input-bordered max-w-xs bg-card-bg-gradient-dark rounded-full py-1 h-full w-full leading-tight ${set.isCompleted ? 'bg-green-500' : ''}`}
                  onChange={(e) => handleWeightInput(e, exercise.id, set.setNumber)}
                  onKeyDown={preventInvalidInput} // Prevent '-' character
                  value={set.weight < 0 ? '' : set.weight}
                />
              </div>

              {/* input field for reps */}
              <div className='w-2/12 flex justify-center'>
                <input
                  type="number"
                  className={`input input-bordered max-w-xs bg-card-bg-gradient-dark rounded-full py-1 h-full w-full leading-tight ${set.isCompleted ? 'bg-green-500' : ''}`}
                  onChange={(e) => handleRepInput(e, exercise.id, set.setNumber)}
                  onKeyDown={preventInvalidInput} // Prevent '-' character
                  value={set.reps < 0 ? '' : set.reps}
                />
              </div>

              {/* complete set button */}
              <button className='border p-1 rounded-full'
                onClick={() => handleCompletedSet(exercise.id, set.setNumber)}
              >
                <FaCheck />
              </button>

            </div>
          </li>
        ))}
      </ul>
    </div >
  )
}

export default TrackSets