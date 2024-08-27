'use client'
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
    name: string;
    changeName: Dispatch<SetStateAction<boolean>>;
}

const PageName = ({ name, changeName }: Props) => {
    return (
        <h1 className='flex justify-center font-bold text-3xl md:text-5xl mb-5 items-center leading-none'>
            <span
                onClick={() => changeName(true)}
                className='truncate max-w-full leading-normal'
            >
                {name}
            </span>
        </h1>
    )
}

export default PageName;
