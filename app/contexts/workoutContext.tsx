// Keeps track of a single workout in progress 

'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Workout } from '../workout/objects/classes';

// Define the shape of the context
interface WorkoutContextType {
    workout: Workout;
    setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
}

type Props = {
    children: ReactNode;
}

// Create the context with a default value
const workoutContext = createContext<WorkoutContextType | null>(null);

const WorkoutContextProvider = ({ children }: Props) => {
    const [workout, setWorkout] = useState<Workout>(new Workout());

    return (
        <workoutContext.Provider value={{ workout, setWorkout }}>
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
