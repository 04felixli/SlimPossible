// Keeps track of what exercises user has when creating a workout template

'use client';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Exercise } from '../workout/objects/classes';

// Define the shape of the context
interface TemplateExercisesContextType {
    templateExercises: Exercise[];
    setTemplateExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

type Props = {
    children: ReactNode;
}

// Create the context with a default value
const templateExercisesContext = createContext<TemplateExercisesContextType | null>(null);

const TemplateExercisesContextProvider = ({ children }: Props) => {
    const [templateExercises, setTemplateExercises] = useState<Exercise[]>([]);

    return (
        <templateExercisesContext.Provider value={{ templateExercises, setTemplateExercises }}>
            {children}
        </templateExercisesContext.Provider>
    );
};

export default TemplateExercisesContextProvider;

// Custom hook for consuming the context
export const useTemplateExercises = () => {
    const context = useContext(templateExercisesContext);
    if (!context) {
        throw new Error('useTemplateExercises must be used within a TemplateExercisesContextProvider');
    }
    return context;
};
