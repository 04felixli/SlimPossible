// Keeps track of what exercises the user is selecting

'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Exercise } from '../workout/start/objects/classes';

// Define the shape of the context
interface SelectedExercisesContextType {
    selectedExercises: Exercise[];
    setSelectedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

type Props = {
    children: ReactNode;
}

// Create the context with a default value
const selectedExercisesContext = createContext<SelectedExercisesContextType | null>(null);

const SelectedExercisesContextProvider = ({ children }: Props) => {
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

    return (
        <selectedExercisesContext.Provider value={{ selectedExercises, setSelectedExercises }}>
            {children}
        </selectedExercisesContext.Provider>
    );
};

export default SelectedExercisesContextProvider;

// Custom hook for consuming the context
export const useSelectedExercises = () => {
    const context = useContext(selectedExercisesContext);
    if (!context) {
        throw new Error('useSelectedExercises must be used within a SelectedExercisesContextProvider');
    }
    return context;
};
