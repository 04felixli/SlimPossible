// 'use client';
// import React, { createContext, useState, ReactNode, useContext } from 'react';
// import { Workout } from '../workout/objects/classes';
// import { addSet, removeExercise, changeWeightUnit, updateNotes, toggleNotes, addExercises, changeRepsValue, changeWeightValue, multipleExerciseSelect, replaceExercise, singleExerciseSelect, toggleCompletedSet, resetWorkout, changeStartAndEndTime, endHistory, action } from './util/workoutFunctions';
// import { ExerciseInList } from '../exercises/interfaces/exercises';
// import workout from '../workout/page';

// // Define the shape of the context
// interface SideBarContextType {
//     expanded: boolean;
//     setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
// }

// type Props = {
//     children: ReactNode;
// }

// // Create the context with a default value
// const SideBarContext = createContext<SideBarContextType | null>(null);

// const SideBarContextProvider = ({ children }: Props) => {
//     const [expanded, setExpanded] = useState<boolean>(true);
//     return (
//         <SideBarContext.Provider value={{
//             expanded,
//             setExpanded,
//         }}>
//             {children}
//         </SideBarContext.Provider>
//     );
// };

// export default SideBarContextProvider;

// // Custom hook for consuming the context
// export const useSideBarContext = () => {
//     const context = useContext(SideBarContext);
//     if (!context) {
//         throw new Error('useHistory must be used within a HistoryContextProvider');
//     }
//     return context;
// };
