import React, { Children, createContext, ReactNode, useContext } from 'react';
import MobileNavBar from '../MobileNavBar';
import SideBar from '../Navigation/SideBar';
import SideBarItem from '../Navigation/SideBarItem';
import PageContent from './PageContent';
import { FaPlus, FaCalendar, FaDumbbell } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';
import MobileMenu from '../Navigation/MobileMenu';
import MobileMenuItem from '../Navigation/MobileMenuItem';
import { cookies } from 'next/headers';
import { setExpandedCookieFunction } from '../Library/actions';

interface LayoutProps {
    children: ReactNode;
    activePage: string;
}

export const navLinks = [
    { page: "/dashboard", name: "Dashboard", icon: <MdOutlineDashboard className='h-5 w-5' />, requiresAuth: true },
    { page: "/workout", name: "Workout", icon: <FaPlus className='h-5 w-5' />, requiresAuth: true },
    { page: "/history", name: "History", icon: <FaCalendar className='h-5 w-5' />, requiresAuth: true },
    { page: "/exercises", name: "Exercises", icon: <FaDumbbell className='h-5 w-5' />, requiresAuth: true },
]

const PageLayout = async ({ children, activePage }: LayoutProps) => {
    // Access the cookies object
    const cookiesObject = cookies();

    // Get a specific cookie by name
    const expandedValue = cookiesObject.get("isExpanded");
    const isExpanded = expandedValue ? expandedValue.value === 'true' : (expandedValue === undefined ? true : false);
    return (
        <div className='w-full h-full'>
            {/* <SideBarContextProvider> */}
            <SideBar className='max-lg:hidden' isExpanded={isExpanded}>
                {navLinks.map((link, index) => (
                    <SideBarItem
                        key={index}
                        page={link.page}
                        icon={link.icon}
                        text={link.name}
                        isActive={activePage === link.page}
                        isExpanded={isExpanded}
                    />
                ))}
            </SideBar>
            <MobileMenu className='lg:hidden'>
                {navLinks.map((link, index) => (
                    <MobileMenuItem
                        key={index}
                        page={link.page}
                        icon={link.icon}
                        text={link.name}
                    />
                ))}
            </MobileMenu>
            <PageContent isExpanded={isExpanded}>
                {children}
            </PageContent>
            {/* </SideBarContextProvider> */}
        </div>
    );
}

export default PageLayout;
