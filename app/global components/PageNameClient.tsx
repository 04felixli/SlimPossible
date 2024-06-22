'use client'
import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react'
import { AiFillEdit } from 'react-icons/ai';

interface Props {
    name: string;
    changeName: Dispatch<SetStateAction<boolean>>;
}

const PageName = ({ name, changeName }: Props) => {
    return (
        <h1 className='flex justify-center font-bold text-5xl mb-5 items-center' >
            <span>{name}</span>
            <AiFillEdit className='h-8 w-8 ml-3 hover:cursor-pointer' onClick={() => changeName(true)} />
        </h1>
    )
}

export default PageName