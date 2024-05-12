import React from 'react'

interface Props {
    name: string;
}

const PageName = (props: Props) => {
    return (
        <h1 className='flex justify-center font-bold text-5xl mb-5'>{props.name}</h1>
    )
}

export default PageName