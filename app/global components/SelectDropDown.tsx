import React from 'react';

interface Props {
    items: string[];
    selected: string;
    setSelectedFunction: (item: string) => void;
    className?: string;
}

const SelectDropDown = ({ items, selected, setSelectedFunction, className }: Props) => {
    return (
        <div className={`dropdown dropdown-hover ${className}`}>
            <div tabIndex={0} role="button" className="btn bg-darkest-color hover:bg-darkest-color hover:outline-none border-none text-white w-full">{selected}</div>
            <ul tabIndex={0} className="dropdown-content menu bg-darkest-color rounded-box z-[1] w-52 p-2 shadow">
                {items.map((item, index) => (
                    <li key={index} onClick={() => setSelectedFunction(item)}><a>{item}</a></li>
                ))}
            </ul>
        </div>
    );
};

export default SelectDropDown;
