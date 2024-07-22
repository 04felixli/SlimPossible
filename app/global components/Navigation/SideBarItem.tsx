"use client"
import React, { ReactNode, useContext } from 'react'
import Link from 'next/link';
import { useSideBarContext } from '../../contexts/sideBarContext';
import { usePathname } from 'next/navigation';

interface Props {
    page: string;
    icon: React.JSX.Element;
    text: string;
}

const SideBarItem = ({ page, icon, text }: Props) => {
    const { expanded } = useSideBarContext();
    const pathname = usePathname();

    return (
        <Link href={page} className={`relative flex items-center justify-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${pathname == page ? 'border' : 'hover:scale-105 duration-300'}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0 h-0'}`}>{text}</span>

            {!expanded && <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>{text}</div>}
        </Link>
    )
}

export default SideBarItem