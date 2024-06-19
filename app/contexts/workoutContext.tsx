'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Workout } from '../workout/objects/classes';
import { addExercises, addSet, changeRepsValue, changeWeightUnit, changeWeightValue, multipleExerciseSelect, removeExercise, replaceExercise, singleExerciseSelect, toggleCompletedSet, toggleNotes, updateNotes } from './util/workoutFunctions';
import { ExerciseInList } from '../exercises/interfaces/exercises';

// Define the shape of the context
interface WorkoutContextType {
    workout: Workout;
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
    addSet: (exerciseId: number, insertionNumber: number) => void;
    removeExercise: (exerciseId: number, insertionNumber: number) => void;
    changeWeightUnit: (exerciseId: number, insertionNumber: number) => void;
    updateNotes: (exerciseId: number, value: string, insertionNumber: number) => void;
    toggleNotes: (exerciseId: number, insertionNumber: number) => void;
    addExercises: () => void;
    replaceExercise: (exerciseToReplaceId?: number, insertionNumberOfExerciseToReplace?: number) => void;
    multipleExerciseSelect: (selectedExercise: ExerciseInList) => void;
    singleExerciseSelect: (selectedExercise: ExerciseInList) => void;
    toggleCompletedSet: (exerciseId: number, setNumber: number, insertionNumber: number) => void;
    changeWeightValue: (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => void;
    changeRepsValue: (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => void;
}

type Props = {
    children: ReactNode;
}

// Create the context with a default value
const workoutContext = createContext<WorkoutContextType | null>(null);

const WorkoutContextProvider = ({ children }: Props) => {
    const [workout, setWorkout] = useState<Workout>(new Workout());

    const addSetHandler = (exerciseId: number, insertionNumber: number) => addSet(setWorkout, exerciseId, insertionNumber);
    const removeExerciseHandler = (exerciseId: number, insertionNumber: number) => removeExercise(setWorkout, exerciseId, insertionNumber);
    const changeWeightUnitHandler = (exerciseId: number, insertionNumber: number) => changeWeightUnit(setWorkout, exerciseId, insertionNumber);
    const updateNotesHandler = (exerciseId: number, value: string, insertionNumber: number) => updateNotes(setWorkout, exerciseId, value, insertionNumber);
    const toggleNotesHandler = (exerciseId: number, insertionNumber: number) => toggleNotes(setWorkout, exerciseId, insertionNumber);
    const addExercisesHandler = () => addExercises(setWorkout)
    const replaceExerciseHandler = (exerciseToReplaceId?: number, insertionNumberOfExerciseToReplace?: number) => replaceExercise(setWorkout, exerciseToReplaceId, insertionNumberOfExerciseToReplace);
    const multipleExerciseSelectHandler = (selectedExercise: ExerciseInList) => multipleExerciseSelect(workout, setWorkout, selectedExercise);
    const singleExerciseSelectHandler = (selectedExercise: ExerciseInList) => singleExerciseSelect(workout, setWorkout, selectedExercise);
    const toggleCompletedSetHandler = (exerciseId: number, setNumber: number, insertionNumber: number) => toggleCompletedSet(setWorkout, exerciseId, setNumber, insertionNumber);
    const changeWeightValueHandler = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => changeWeightValue(setWorkout, event, exerciseId, setNumber, insertionNumber);
    const changeRepsValueHandler = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => changeRepsValue(setWorkout, event, exerciseId, setNumber, insertionNumber);

    return (
        <workoutContext.Provider value={{
            workout,
            setWorkout,
            addSet: addSetHandler,
            removeExercise: removeExerciseHandler,
            changeWeightUnit: changeWeightUnitHandler,
            updateNotes: updateNotesHandler,
            toggleNotes: toggleNotesHandler,
            addExercises: addExercisesHandler,
            replaceExercise: replaceExerciseHandler,
            multipleExerciseSelect: multipleExerciseSelectHandler,
            singleExerciseSelect: singleExerciseSelectHandler,
            toggleCompletedSet: toggleCompletedSetHandler,
            changeWeightValue: changeWeightValueHandler,
            changeRepsValue: changeRepsValueHandler
        }}>
            {children}
        </workoutContext.Provider>
    );
};

export default WorkoutContextProvider;

// Custom hook for consuming the context
export const useWorkout = () => {
    const context = useContext(workoutContext);
    if (!context) {
        throw new Error('useWorkout must be used within a WorkoutContextProvider');
    }
    return context;
};
