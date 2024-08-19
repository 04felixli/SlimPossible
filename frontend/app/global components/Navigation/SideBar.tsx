import React, { ReactNode } from 'react';
import { CgProfile } from 'react-icons/cg';
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { setExpandedCookieFunction } from '../Library/actions';
import LogoutButton from './LogoutButton';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface Props {
    children: ReactNode;
    className?: string;
    isExpanded: boolean;
}

const SideBar = async ({ children, isExpanded, className }: Props) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <aside className={`fixed top-0 left-0 h-full ${className}`}>
            <nav className='h-full flex flex-col bg-black rounded-r-md shadow-sm p-4'>
                <div className={`rounded-md w-full my-2 px-3`}>
                    <div className={`relative px-3 py-3 flex items-center font-medium rounded-md transition-colors group`}>
                        <span className={`overflow-hidden transition-all font-bold text-xl ${isExpanded ? "w-52 ml-3" : "w-0"}`}>SlimPossible</span>
                        <form action={setExpandedCookieFunction}>
                            <button>
                                <BsLayoutTextSidebarReverse
                                    className={`h-5 w-5 flex-shrink-0 cursor-pointer hover:scale-105 duration-300`}
                                />
                            </button>
                        </form>
                    </div>
                </div>
                <ul className={`flex-1 px-3`}>{children}</ul>
                <LogoutButton isExpanded={isExpanded} />
                <div className={`w-full my-2 px-3 border-t`}>
                    <div className={`relative px-3 py-3 flex items-center font-medium rounded-md transition-colors group`}>
                        <CgProfile
                            className={`h-5 w-5 flex-shrink-0`}
                        />
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${isExpanded ? 'w-52 ml-3' : 'w-0'}`}>
                            <div className='leading-4'>
                                <h4 className='font-semibold'>{user && user.given_name ? user.given_name : 'User'}</h4>
                                <span className='text-xs'>{user && user.email ? user.email : 'User@gmail.com'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </aside >
    )
}

export default SideBar