// Keeps track of a single workout in progress 

'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Workout } from '../workout/objects/classes';
import { addSet, removeExercise, changeWeightUnit, updateNotes, toggleNotes, addExercises, changeRepsValue, changeWeightValue, multipleExerciseSelect, replaceExercise, singleExerciseSelect, toggleCompletedSet, resetWorkout, endTemplate } from './util/workoutFunctions';
import { ExerciseInList } from '../exercises/interfaces/exercises';
import workout from '../workout/page';

// Define the shape of the context
interface TemplateContextType {
    template: Workout;
    setTemplate: React.Dispatch<React.SetStateAction<Workout>>;
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
    resetTemplateContext: () => void;
    endTemplate: (post: boolean) => void;
}

type Props = {
    children: ReactNode;
}

// Create the context with a default value
const templateContext = createContext<TemplateContextType | null>(null);

const TemplateContextProvider = ({ children }: Props) => {
    const [template, setTemplate] = useState<Workout>(new Workout());

    const addSetHandler = (exerciseId: number, insertionNumber: number) => addSet(setTemplate, exerciseId, insertionNumber);
    const removeExerciseHandler = (exerciseId: number, insertionNumber: number) => removeExercise(setTemplate, exerciseId, insertionNumber);
    const changeWeightUnitHandler = (exerciseId: number, insertionNumber: number) => changeWeightUnit(setTemplate, exerciseId, insertionNumber);
    const updateNotesHandler = (exerciseId: number, value: string, insertionNumber: number) => updateNotes(setTemplate, exerciseId, value, insertionNumber);
    const toggleNotesHandler = (exerciseId: number, insertionNumber: number) => toggleNotes(setTemplate, exerciseId, insertionNumber);
    const addExercisesHandler = () => addExercises(setTemplate)
    const replaceExerciseHandler = (exerciseToReplaceId?: number, insertionNumberOfExerciseToReplace?: number) => replaceExercise(setTemplate, exerciseToReplaceId, insertionNumberOfExerciseToReplace);
    const multipleExerciseSelectHandler = (selectedExercise: ExerciseInList) => multipleExerciseSelect(template, setTemplate, selectedExercise);
    const singleExerciseSelectHandler = (selectedExercise: ExerciseInList) => singleExerciseSelect(template, setTemplate, selectedExercise);
    const toggleCompletedSetHandler = (exerciseId: number, setNumber: number, insertionNumber: number) => toggleCompletedSet(setTemplate, exerciseId, setNumber, insertionNumber);
    const changeWeightValueHandler = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => changeWeightValue(setTemplate, event, exerciseId, setNumber, insertionNumber);
    const changeRepsValueHandler = (event: React.ChangeEvent<HTMLInputElement>, exerciseId: number, setNumber: number, insertionNumber: number) => changeRepsValue(setTemplate, event, exerciseId, setNumber, insertionNumber);
    const resetTemplateContextHandler = () => resetWorkout(setTemplate);
    const endTemplateHandler = (post: boolean) => endTemplate(template, setTemplate, post);

    return (
        <templateContext.Provider value={{
            template,
            setTemplate,
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
            resetTemplateContext: resetTemplateContextHandler,
            endTemplate: endTemplateHandler
        }}>
            {children}
        </templateContext.Provider>
    );
};

export default TemplateContextProvider;

// Custom hook for consuming the context
export const useTemplate = () => {
    const context = useContext(templateContext);
    if (!context) {
        throw new Error('useTemplate must be used within a TemplateContextProvider');
    }
    return context;
};
