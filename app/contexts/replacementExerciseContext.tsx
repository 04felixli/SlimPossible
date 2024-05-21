// Keeps track of what exercises the user is selecting

'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Exercise } from '../workout/start/objects/classes';

// Define the shape of the context
interface ReplacementExerciseContextType {
    replacementExercise: Exercise | null;
    setReplacementExercise: React.Dispatch<React.SetStateAction<Exercise | null>>;
}

type Props = {
    children: ReactNode;
}

// Create the context with a default value
const replaceExerciseContext = createContext<ReplacementExerciseContextType | null>(null);

const ReplacementExerciseContextProvider = ({ children }: Props) => {
    const [replacementExercise, setReplacementExercise] = useState<Exercise | null>(null);

    return (
        <replaceExerciseContext.Provider value={{ replacementExercise, setReplacementExercise }}>
            {children}
        </replaceExerciseContext.Provider>
    );
};

export default ReplacementExerciseContextProvider;

// Custom hook for consuming the context
export const useReplacementExercise = () => {
    const context = useContext(replaceExerciseContext);
    if (!context) {
        throw new Error('useReplacementExercise must be used within a ReplacementExerciseContextProvider');
    }
    return context;
};
