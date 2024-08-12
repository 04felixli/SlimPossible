"use client"
import React, { useState, useEffect, ReactNode } from 'react'
import { CiLogout, CiMenuFries } from 'react-icons/ci';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../PageLayouts/layout';
import { BsLayoutTextSidebarReverse } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { IoIosClose } from "react-icons/io";
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface Props {
    children: ReactNode
    className?: string
}

const MobileMenu = ({ children, className }: Props) => {
    const { getUser } = useKindeBrowserClient();
    const user = getUser();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(prevOpen => !prevOpen);
    }

    // Disable scrolling when the menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto'; // Cleanup on unmount
        }
    }, [isOpen]);

    return (
        <div className={`${className}`}>
            <div className='fixed top-5 right-5 z-30'>
                <BsLayoutTextSidebarReverse className='w-7 h-7 cursor-pointer hover:scale-105 transition-transform duration-300' onClick={toggleMenu} />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className='fixed inset-0 bg-black flex flex-col items-center justify-center z-40'
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className='h-full flex flex-col bg-black rounded-r-md shadow-sm p-4 items-center justify-center mt-10'>
                            <IoIosClose
                                className={`h-10 w-10 flex-shrink-0 cursor-pointer hover:scale-105 duration-300 fixed top-5 right-5 z-40`}
                                onClick={toggleMenu}
                            />
                            <div className={`w-full flex justify-center my-2 px-3`}>
                                <div className={`relative px-3 py-3 flex items-center justify-between font-medium rounded-md transition-colors group`}>
                                    <span className={`overflow-hidden transition-all font-bold text-xl`}>SlimPossible</span>
                                </div>
                            </div>

                            <ul className={`flex-1 px-3 w-full`}>{children}</ul>

                            <LogoutLink className={`rounded-md w-full my-2 px-3 hover:scale-105 hover:bg-card-bg-gradient-light hover:duration-300`}>
                                <div className={`relative justify-between px-3 py-3 flex items-center font-medium rounded-md transition-colors group`}>
                                    <span className={`overflow-hidden transition-all text-nowrap`}>Log out</span>
                                    <CiLogout
                                        className={`h-5 w-5 flex-shrink-0 cursor-pointer`}
                                    />
                                </div>
                            </LogoutLink>


                            <div className={`w-full my-2 px-3 border-t`}>
                                <div className={`relative px-3 py-3 flex items-center font-medium rounded-md transition-colors group`}>
                                    <CgProfile
                                        className={`h-5 w-5 flex-shrink-0`}
                                    />
                                    <div className={`flex justify-between items-center overflow-hidden transition-all ml-3`}>
                                        <div className='leading-4'>
                                            <h4 className='font-semibold'>{user && user.given_name ? user.given_name : 'User'}</h4>
                                            <span className='text-xs'>{user && user.email ? user.email : 'User@gmail.com'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MobileMenu;
