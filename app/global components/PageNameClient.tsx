'use client'
import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react'

interface Props {
    name: string;
    changeName: Dispatch<SetStateAction<boolean>>;
}

const PageName = ({ name, changeName }: Props) => {
    return (
        <h1 className='flex justify-center font-bold text-5xl mb-5' >
            <span onClick={() => changeName(true)}>{name}</span>
        </h1>
    )
}

export default PageName