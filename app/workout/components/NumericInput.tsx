import React, { useEffect, useRef } from 'react'

interface Props {
    name: string;
    value: number | string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    className: string;
    disabled?: boolean;
}

const NumericInput: React.FC<Props> = ({
    name,
    value,
    onChange,
    onKeyDown,
    className,
    disabled = false, // default value for disabled
}) => {
    const inputValue = value !== undefined ? value : '';

    return (
        <input
            type="number"
            name={name}
            value={inputValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={`text-center ${className}`} // Center the text horizontally
            disabled={disabled}
        />
    )
}

export default NumericInput


{/* input field for weight */ }
{/* <div className='w-2/12 flex justify-center'>
<input
  type="number"
  className={`input input-bordered max-w-xs bg-card-bg-gradient-dark rounded-full py-1 h-full w-full leading-tight ${set.isCompleted ? 'bg-green-500' : ''}`}
  onChange={(e) => handleWeightInput(e, exercise.id, set.setNumber)}
  onKeyDown={preventInvalidInput} // Prevent '-' character
  value={set.weight < 0 ? '' : set.weight}
/>
</div> */}

{/* Input field for notes */ }
// {exercise.showNotes && <div>
//     <textarea
//         id={`notes_${exercise.id}`}
//         value={exercise.notes ? exercise.notes : ''}
//         onChange={(e) => {
//             handleNotesChange(exercise.id, e.target.value);
//             e.target.style.height = 'auto'; // Reset height to auto
//             e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
//         }}
//         className="focus:outline-none bg-transparent border-b w-full mt-2 resize-none overflow-hidden min-h-8 h-auto text-sm"
//         placeholder={exercise.notes ? exercise.notes : 'Add Notes'}
//     />
// </div>}