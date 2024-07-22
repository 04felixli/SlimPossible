import React, { Children, createContext, ReactNode, useContext } from 'react';
import MobileNavBar from '../MobileNavBar';
import SideBar from '../Navigation/SideBar';
import SideBarItem from '../Navigation/SideBarItem';
import SideBarContextProvider from '../../contexts/sideBarContext';
import PageContent from './PageContent';
import { FaPlus, FaCalendar, FaDumbbell } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';

interface LayoutProps {
    children: ReactNode;
}

export const navLinks = [
    { page: "/dashboard", name: "Dashboard", icon: <MdOutlineDashboard className='h-5 w-5' />, requiresAuth: true },
    { page: "/workout", name: "Workout", icon: <FaPlus className='h-5 w-5' />, requiresAuth: true },
    { page: "/history", name: "History", icon: <FaCalendar className='h-5 w-5' />, requiresAuth: true },
    { page: "/exercises", name: "Exercises", icon: <FaDumbbell className='h-5 w-5' />, requiresAuth: true },
]

const PageLayout = ({ children }: LayoutProps) => {
    return (
        <div className='w-full h-full'>
            <SideBarContextProvider>
                <SideBar>
                    {navLinks.map((link, index) => (
                        <SideBarItem
                            key={index}
                            page={link.page}
                            icon={link.icon}
                            text={link.name}
                        />
                    ))}
                </SideBar>
                <PageContent>
                    {children}
                </PageContent>
            </SideBarContextProvider>
        </div>
    );
}

export default PageLayout;
