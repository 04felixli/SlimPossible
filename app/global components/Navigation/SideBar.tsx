"use client"
import React, { createContext, ReactNode, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { FaFontAwesomeLogoFull } from "react-icons/fa";
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { usePathname } from 'next/navigation';
import { useSideBarContext } from '../../contexts/sideBarContext';
import { CiLogout } from "react-icons/ci";

interface Props {
    children: ReactNode;
    className?: string;
}

const SideBar = ({ children, className }: Props) => {
    const { expanded, setExpanded } = useSideBarContext();
    const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

    return (
        <aside className={`fixed top-0 left-0 h-full ${className}`}>
            {isAuthenticated && <>
                <nav className='h-full flex flex-col bg-black rounded-r-md shadow-sm p-4'>
                    <div className={`rounded-md w-full my-2 px-3`}>
                        <div className={`relative px-3 py-3 flex items-center font-medium rounded-md transition-colors group`}>
                            <span className={`overflow-hidden transition-all font-bold text-xl ${expanded ? "w-52 ml-3" : "w-0"}`}>SlimPossible</span>
                            <button onClick={() => setExpanded(prevState => !prevState)}>
                                <BsLayoutTextSidebarReverse
                                    className={`h-5 w-5 flex-shrink-0 cursor-pointer bg-gray-500 hover:bg-gray-600 hover:scale-105 duration-300`}
                                />
                            </button>
                        </div>
                    </div>

                    <ul className={`flex-1 px-3`}>{children}</ul>

                    <div className={`rounded-md w-full my-2 px-3 hover:scale-105 hover:bg-card-bg-gradient-light hover:duration-300`}>
                        <LogoutLink className={`relative px-3 py-3 flex items-center font-medium rounded-md transition-colors group`}>
                            <span className={`overflow-hidden transition-all text-nowrap ${expanded ? "w-52 ml-3" : "w-0"}`}>Log out</span>
                            <CiLogout
                                className={`h-5 w-5 flex-shrink-0 cursor-pointer`}
                            />
                            {!expanded && (
                                <div
                                    className={`absolute text-nowrap left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-2`}
                                >
                                    Log out
                                </div>
                            )}
                        </LogoutLink>
                    </div>


                    <div className={`w-full my-2 px-3 border-t`}>
                        <div className={`relative px-3 py-3 flex items-center font-medium rounded-md transition-colors group`}>
                            <CgProfile
                                className={`h-5 w-5 flex-shrink-0`}
                            />
                            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}>
                                <div className='leading-4'>
                                    <h4 className='font-semibold'>Test User</h4>
                                    <span className='text-xs'>testUser@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </>}
        </aside >
    )
}

export default SideBar