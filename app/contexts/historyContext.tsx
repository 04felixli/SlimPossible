// Keeps track of a workout history that the user might be viewing or editing 

'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Workout } from '../workout/objects/classes';
import { addSet, removeExercise, changeWeightUnit, updateNotes, toggleNotes, addExercises, changeRepsValue, changeWeightValue, multipleExerciseSelect, replaceExercise, singleExerciseSelect, toggleCompletedSet, resetWorkout, changeStartAndEndTime, endHistory, action, cookies } from './util/workoutFunctions';
import { ExerciseInList } from '../exercises/interfaces/exercises';
import workout from '../workout/page';

// Define the shape of the context
interface HistoryContextType {
    history: Workout;
    setHistory: React.Dispatch<React.SetStateAction<Workout>>;
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
    // resetHistoryContext: () => void;
    changeStartAndEndTime: (newStartTime: Date, newEndTime: Date) => void;
    endHistory: (cause: action) => void;
}

type Props = {
    children: ReactNode;
}

// Create the context with a default value
const historyContext = createContext<HistoryContextType | null>(null);

const HistoryContextProvider = ({ children }: Props) => {
    const [history, setHistory] = useState<Workout>(new Workout());

    const addSetHandler = (exerciseId: number, insertionNumber: number) => addSet(setHistory, exerciseId, insertionNumber);
    const removeExerciseHandler = (exerciseId: number, insertionNumber: number) => removeExercise(cookies.history, setHistory, exerciseId, insertionNumber);
    const changeWeightUnitHandler = (exerciseId: number, insertionNumber: number) => changeWeightUnit(setHistory, exerciseId, insertionNumber);
    const updateNotesHandler = (exerciseId: number, value: string, insertionNumber: number) => updateNotes(setHistory, exerciseId, value, insertionNumber);
    const toggleNotesHandler = (exerciseId: number, insertionNumber: number) => toggleNotes(setHistory, exerciseId, insertionNumber);
    const addExercisesHandler = () => addExercises(cookies.history, setHistory)
    const replaceExerciseHandler = (exerciseToReplaceId?: number, insertionNumberOfExerciseToReplace?: number) => replaceExercise(cookies.history, setHistory, exerciseToReplaceId, insertionNumberOfExerciseToReplace);
    const multipleExerciseSelectHandler = (selectedExercise: ExerciseInList) => multipleExerciseSelect(history, setHistory, selectedExercise);
    const singleExerciseSelectHandler = (selectedExercise: ExerciseInList) => singleExerciseSelect(history, setHistory, selectedExercise);
    const toggleCompletedSetHandler = (exerciseId: number, setNumber: number, insertionNumber: number) => toggleCompletedSet(setHistory, exerciseId, setNumber, insertionNumber);
    const changeWeightValueHandler = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => changeWeightValue(setHistory, event, exerciseId, setNumber, insertionNumber);
    const changeRepsValueHandler = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => changeRepsValue(setHistory, event, exerciseId, setNumber, insertionNumber);
    // const resetHistoryContextHandler = () => resetWorkout(setHistory);
    const changeStartAndEndTimeHandler = (newStartTime: Date, newEndTime: Date) => changeStartAndEndTime(setHistory, newStartTime, newEndTime);
    const endHistoryHandler = (cause: action) => endHistory(history, setHistory, cause);

    return (
        <historyContext.Provider value={{
            history,
            setHistory,
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
            // resetHistoryContext: resetHistoryContextHandler,
            changeStartAndEndTime: changeStartAndEndTimeHandler,
            endHistory: endHistoryHandler
        }}>
            {children}
        </historyContext.Provider>
    );
};

export default HistoryContextProvider;

// Custom hook for consuming the context
export const useHistory = () => {
    const context = useContext(historyContext);
    if (!context) {
        throw new Error('useHistory must be used within a HistoryContextProvider');
    }
    return context;
};
