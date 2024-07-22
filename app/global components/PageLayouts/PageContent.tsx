"use client"
import { useSideBarContext } from '@/app/contexts/sideBarContext';
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
}

const PageContent = ({ children }: Props) => {
    const { expanded } = useSideBarContext();
    return (
        <section
            className={`flex-grow pt-20 flex justify-center px-[10%] transition-margin duration-300 h-full ${expanded ? 'ml-52' : 'ml-16'}`}
        >
            <div className='w-full pb-36'>{children}</div>
            {/* <div className='fixed bottom-10 z-50'>
                    <MobileNavBar />
                </div> */}
        </section>
    )
}

export default PageContent