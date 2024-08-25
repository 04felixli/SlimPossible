import React from 'react';

interface Props {
    items: string[];
    selected: string;
    setSelectedFunction: (item: string) => void;
    className?: string;
    disabled?: boolean;
    name: string;
}

const SelectDropDown = ({ items, selected, setSelectedFunction, className, name, disabled = false }: Props) => {
    return (
        <div className={`${className} ${disabled ? '' : 'dropdown dropdown-hover'}`}>
            <button
                tabIndex={0}
                role="button"
                className={`btn bg-darkest-color hover:bg-darkest-color hover:outline-none border-none w-full ${disabled ? 'cursor-not-allowed text-disabled-color' : 'text-white'}`}
                onClick={(e) => e.preventDefault()}
                aria-disabled={disabled}
            >
                {selected}
            </button>
            <input
                type="text"
                name={name}
                value={selected}
                className='hidden'
            />
            {!disabled && (
                <ul tabIndex={0} className="dropdown-content menu bg-darkest-color rounded-box z-[1] w-52 p-2 shadow">
                    {items.map((item, index) => (
                        <li key={index} onClick={() => setSelectedFunction(item)}>
                            <a>{item}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectDropDown;
