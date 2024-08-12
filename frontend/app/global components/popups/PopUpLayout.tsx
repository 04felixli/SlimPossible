'use client'
import React, { ReactNode } from 'react';
import './popup.css'

export enum popupContentClassNames {
    confirmation = 'confirmation-popup-content',
    previewCard = 'preview-card-popup-content',
}

interface LayoutProps {
    children: ReactNode;
    className?: string;
    closePopUp: () => void;
    popupContentClassName: string;
}

const PopUpLayout = ({ children, className, closePopUp, popupContentClassName }: LayoutProps) => {
    return (
        <div className='popup-overlay hover:cursor-pointer z-50' onClick={closePopUp}>
            <div className={`${popupContentClassName} hover:cursor-default ${className}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default PopUpLayout