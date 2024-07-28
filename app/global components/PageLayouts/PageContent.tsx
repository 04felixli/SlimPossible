import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    isExpanded: boolean;
}

const PageContent = ({ children, isExpanded }: Props) => {

    return (
        <section
            className={`flex-grow pt-20 flex justify-center px-[10%] transition-margin duration-300 h-full ${isExpanded ? 'lg:ml-64 xl:ml-52' : 'lg:ml-16'}`}
        >
            <div className='w-full pb-36'>{children}</div>
        </section>
    )
}

export default PageContent;
