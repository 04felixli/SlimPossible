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