import React from 'react';

interface Props {
    name: string;
    value: number | string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    placeHolder?: string;
}

const InputField: React.FC<Props> = ({
    name,
    value,
    onChange,
    // onKeyDown,
    className,
    disabled = false, // default value for disabled
    placeHolder
}) => {
    const inputValue = value !== undefined ? value : '';

    return (
        <input
            type="text"
            name={name}
            value={inputValue}
            onChange={onChange}
            // onKeyDown={onKeyDown}
            className={`${className}`} // Center the text horizontally
            disabled={disabled}
            placeholder={placeHolder}
        />
    )
}

export default InputField