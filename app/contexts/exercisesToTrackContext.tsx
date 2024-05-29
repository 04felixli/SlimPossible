// Keeps track of what exercises user has in their workout

'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Exercise } from '../workout/objects/classes';

// Define the shape of the context
interface ExercisesToTrackContextType {
    exercisesToTrack: Exercise[];
    setExercisesToTrack: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

type Props = {
    children: ReactNode;
}

// Create the context with a default value
const exercisesToTrackContext = createContext<ExercisesToTrackContextType | null>(null);

const ExercisesToTrackContextProvider = ({ children }: Props) => {
    const [exercisesToTrack, setExercisesToTrack] = useState<Exercise[]>([]);

    return (
        <exercisesToTrackContext.Provider value={{ exercisesToTrack, setExercisesToTrack }}>
            {children}
        </exercisesToTrackContext.Provider>
    );
};

export default ExercisesToTrackContextProvider;

// Custom hook for consuming the context
export const useExercisesToTrack = () => {
    const context = useContext(exercisesToTrackContext);
    if (!context) {
        throw new Error('useExercisesToTrack must be used within a ExercisesToTrackContextProvider');
    }
    return context;
};
