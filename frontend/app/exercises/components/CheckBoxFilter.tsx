import React from 'react'
import { DebouncedState } from 'use-debounce';

interface Props {
    checked: boolean;
    className?: string;
    onChangeFunction: DebouncedState<(viewcustom: boolean) => void>;
    labelText: string;
    classNameForLabelText?: string;
}

const CheckBoxFilter = ({ checked, className, onChangeFunction, labelText, classNameForLabelText }: Props) => {
    return (
        <label>
            <input
                type="checkbox"
                checked={checked}
                className={`${className}`}
                onChange={(e) => onChangeFunction(e.target.checked)}
            />
            <span className={`ml-1 ${classNameForLabelText}`}>{labelText}</span>
        </label>
    )
}

export default CheckBoxFilter