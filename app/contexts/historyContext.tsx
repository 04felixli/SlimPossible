// Keeps track of a workout history that the user might be viewing or editing 

'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Workout } from '../workout/objects/classes';

// Define the shape of the context
interface HistoryContextType {
    history: Workout;
    setHistory: React.Dispatch<React.SetStateAction<Workout>>;
}

type Props = {
    children: ReactNode;
}

// Create the context with a default value
const historyContext = createContext<HistoryContextType | null>(null);

const HistoryContextProvider = ({ children }: Props) => {
    const [history, setHistory] = useState<Workout>(new Workout());

    return (
        <historyContext.Provider value={{ history, setHistory }}>
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
