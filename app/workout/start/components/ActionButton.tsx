import React, { ReactNode } from 'react'

interface Props {
    onClickFunction?: () => void;
    isRemoveExercise?: boolean;
    children: ReactNode;
}

const ActionButton = ({ children, onClickFunction, isRemoveExercise }: Props) => {
    // Temporary default function if none is provided
    const handleClick = () => {
        console.log("Action button click!");
    };

    const onClick = onClickFunction || handleClick;

    isRemoveExercise = isRemoveExercise === true ? true : false

    return (
        <div className={`flex flex-row rounded-full ${!isRemoveExercise ? 'bg-card-bg-gradient-light text-sm' : 'bg-card-bg-gradient-dark'}`}>
            <button
                className={`w-full h-full ${!isRemoveExercise ? 'py-1 px-6' : 'p-2'}`}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )
}

export default ActionButton