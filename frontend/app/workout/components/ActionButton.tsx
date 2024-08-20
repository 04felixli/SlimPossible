import React, { ReactNode } from 'react';

interface Props {
    onClickFunction?: () => void;
    isRemoveExercise?: boolean;
    children: ReactNode;
}

const ActionButton = ({ children, onClickFunction, isRemoveExercise }: Props) => {
    // Temporary default function if none is provided
    const handleClick = () => { };

    const onClick = onClickFunction || handleClick;

    isRemoveExercise = isRemoveExercise === true ? true : false

    return (
        <div className={`flex flex-row rounded-full shadow-md hover:scale-105 duration-300 ${!isRemoveExercise ? 'bg-card-bg-gradient-light text-sm w-3/12 lg:w-auto' : 'bg-card-bg-gradient-dark'}`}>
            <button
                className={`w-full h-full p-2 rounded-full flex items-center justify-center`}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )
}

export default ActionButton