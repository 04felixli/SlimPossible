'use client';
import React, { createContext, useState, ReactNode, useContext, useRef } from 'react';
import { Workout } from '../global components/objects/classes';
import { localStorageKeys, action, addExercises, addSet, changeRepsValue, changeWeightUnit, changeWeightValue, endWorkout, multipleExerciseSelect, removeExercise, replaceExercise, singleExerciseSelect, startWorkout, toggleCompletedSet, toggleNotes, updateNotes, cookieKeys, changeName, deleteSet, reOrderExercises } from './util/workoutFunctions';
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
    changeName: (newName: string) => void;
    deleteSet: (exerciseId: number, insertionNumber: number, setNumber: number) => void;
    reOrderExercises: (result: any) => void;
    startWorkout: (workout?: Workout) => void;
    endWorkout: (cause: action) => void;
}

type Props = {
    children: ReactNode;
}

// Create the context with the type of WorkoutContextType | null with a default value of null
const workoutContext = createContext<WorkoutContextType | null>(null);

// A function that returns the contextProvider to wrap other components in
const WorkoutContextProvider = ({ children }: Props) => {
    const [workout, setWorkout] = useState<Workout>(new Workout());

    const addSetHandler = (exerciseId: number, insertionNumber: number) => addSet(localStorageKeys.workout, setWorkout, exerciseId, insertionNumber);
    const removeExerciseHandler = (exerciseId: number, insertionNumber: number) => removeExercise(cookieKeys.workout, localStorageKeys.workout, setWorkout, exerciseId, insertionNumber);
    const changeWeightUnitHandler = (exerciseId: number, insertionNumber: number) => changeWeightUnit(localStorageKeys.workout, setWorkout, exerciseId, insertionNumber);
    const updateNotesHandler = (exerciseId: number, value: string, insertionNumber: number) => updateNotes(localStorageKeys.workout, setWorkout, exerciseId, value, insertionNumber);
    const toggleNotesHandler = (exerciseId: number, insertionNumber: number) => toggleNotes(localStorageKeys.workout, setWorkout, exerciseId, insertionNumber);
    const addExercisesHandler = () => addExercises(cookieKeys.workout, localStorageKeys.workout, setWorkout)
    const replaceExerciseHandler = (exerciseToReplaceId?: number, insertionNumberOfExerciseToReplace?: number) => replaceExercise(cookieKeys.workout, localStorageKeys.workout, setWorkout, exerciseToReplaceId, insertionNumberOfExerciseToReplace);
    const multipleExerciseSelectHandler = (selectedExercise: ExerciseInList) => multipleExerciseSelect(localStorageKeys.workout, workout, setWorkout, selectedExercise);
    const singleExerciseSelectHandler = (selectedExercise: ExerciseInList) => singleExerciseSelect(localStorageKeys.workout, workout, setWorkout, selectedExercise);
    const toggleCompletedSetHandler = (exerciseId: number, setNumber: number, insertionNumber: number) => toggleCompletedSet(localStorageKeys.workout, setWorkout, exerciseId, setNumber, insertionNumber);
    const changeWeightValueHandler = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => changeWeightValue(localStorageKeys.workout, setWorkout, event, exerciseId, setNumber, insertionNumber);
    const changeRepsValueHandler = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => changeRepsValue(localStorageKeys.workout, setWorkout, event, exerciseId, setNumber, insertionNumber);
    const changeNameHandler = (newName: string) => changeName(localStorageKeys.workout, setWorkout, newName);
    const deleteSetHandler = (exerciseId: number, insertionNumber: number, setNumber: number) => deleteSet(localStorageKeys.workout, setWorkout, exerciseId, insertionNumber, setNumber);
    const reOrderExercisesHandler = (result: any) => reOrderExercises(result, localStorageKeys.workout, setWorkout);
    const startWorkoutHandler = (workout?: Workout) => startWorkout(localStorageKeys.workout, setWorkout, workout);
    const endWorkoutHandler = (cause: action) => endWorkout(workout, setWorkout, cause);

    return (
        <workoutContext.Provider value={{ // this value sets the createContext to be of type 
            workout,                      // WorkoutContextType instead of null
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
            changeRepsValue: changeRepsValueHandler,
            changeName: changeNameHandler,
            deleteSet: deleteSetHandler,
            reOrderExercises: reOrderExercisesHandler,
            startWorkout: startWorkoutHandler,
            endWorkout: endWorkoutHandler
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
