'use client'
import React, { ReactNode } from 'react';
import MobileNavBar from './MobileNavBar';

interface LayoutProps {
    children: ReactNode;
    className?: string;
    closePopUp: () => void;
}

const PopUpLayout = ({ children, className, closePopUp }: LayoutProps) => {
    return (
        <div className='popup-overlay hover:cursor-pointer z-50' onClick={closePopUp}>
            <div className={`popup-content hover:cursor-default ${className}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default PopUpLayout