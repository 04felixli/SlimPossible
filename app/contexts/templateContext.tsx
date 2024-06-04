// Keeps track of a single workout in progress 

'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Workout } from '../workout/objects/classes';

// Define the shape of the context
interface TemplateContextType {
    template: Workout;
    setTemplate: React.Dispatch<React.SetStateAction<Workout>>;
}

type Props = {
    children: ReactNode;
}

// Create the context with a default value
const templateContext = createContext<TemplateContextType | null>(null);

const TemplateContextProvider = ({ children }: Props) => {
    const [template, setTemplate] = useState<Workout>(new Workout());

    return (
        <templateContext.Provider value={{ template, setTemplate }}>
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
