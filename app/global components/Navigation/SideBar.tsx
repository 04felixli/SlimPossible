"use client"
import React, { createContext, ReactNode, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { FaFontAwesomeLogoFull } from "react-icons/fa";
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { usePathname } from 'next/navigation';
import { useSideBarContext } from '../../contexts/sideBarContext';

interface Props {
    children: ReactNode;
}

const SideBar = ({ children }: Props) => {
    const { expanded, setExpanded } = useSideBarContext();
    const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

    return (
        <aside className='fixed top-0 left-0 h-full'>
            {isAuthenticated && <>
                <nav className='h-full flex flex-col bg-black rounded-r-md shadow-sm p-4'>

                    <div className='pb-2 flex items-center justify-center'>
                        <FaFontAwesomeLogoFull className={`overflow-hidden transition-all ${expanded ? 'w-52' : 'w-0'}`} />
                        <button onClick={() => setExpanded(prevState => !prevState)}>
                            <BsLayoutTextSidebarReverse
                                className={`h-5 w-5 flex-shrink-0 bg-gray-500 hover:bg-gray-600 hover:scale-105 duration-300`}
                            />
                        </button>
                    </div>

                    <ul className='flex-1'>{children}</ul>

                    {isAuthenticated &&
                        <LogoutLink className='border rounded-md px-3 flex items-center justify-center py-2 mb-3'>
                            Log Out
                        </LogoutLink>
                    }

                    <div className='border-t flex p-3 items-center justify-center'>
                        <CgProfile className='w-7 h-7 flex-shrink-0' />
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0 h-0'}`}>
                            <div className='leading-4'>
                                <h4 className='font-semibold'>Test User</h4>
                                <span className='text-xs'>testUser@gmail.com</span>
                            </div>
                        </div>
                    </div>

                </nav>
            </>}
        </aside >
    )
}

export default SideBar