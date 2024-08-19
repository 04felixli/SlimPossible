"use client"
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import React from 'react';
import { CiLogout } from 'react-icons/ci';

interface Props {
    isExpanded: boolean;
}

const LogoutButton = ({ isExpanded }: Props) => {
    return (
        <div className={`rounded-md w-full my-2 px-3 hover:scale-105 hover:bg-card-bg-gradient-light hover:duration-300`}>
            <LogoutLink className={`relative px-3 py-3 flex items-center font-medium rounded-md transition-colors group`}>
                <span className={`overflow-hidden transition-all text-nowrap ${isExpanded ? "w-52 ml-3" : "w-0"}`}>Log out</span>
                <CiLogout
                    className={`h-5 w-5 flex-shrink-0 cursor-pointer`}
                />
                {!isExpanded && (
                    <div
                        className={`absolute text-nowrap left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-2`}
                    >
                        Log out
                    </div>
                )}
            </LogoutLink>
        </div>
    )
}

export default LogoutButton