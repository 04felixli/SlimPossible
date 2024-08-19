import React from 'react';
import { FaDumbbell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import CustomLink from './CustomLink';

const MobileNavBar = () => {
    return (
        <ul className="menu menu-horizontal bg-button-color rounded-box">
            <li>
                <a>
                    <CgProfile className="h-5 w-5" />
                </a>
            </li>
            <li>
                <CustomLink href="/workout">
                    <FaPlus className='h-5 w-5' />
                </CustomLink>
            </li>
            <li>
                <CustomLink href="/history">
                    <FaCalendar className='h-5 w-5' />
                </CustomLink>
            </li>
            <li>
                <CustomLink href="/exercises">
                    <FaDumbbell className="h-5 w-5" />
                </CustomLink>
            </li>
        </ul>
    )
}

export default MobileNavBar