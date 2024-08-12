import React from 'react'
import { FaDumbbell } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";

import Link from 'next/link';

const MobileNavBar = () => {
    return (
        <ul className="menu menu-horizontal bg-button-color rounded-box">
            <li>
                <a>
                    <CgProfile className="h-5 w-5" />
                </a>
            </li>
            <li>
                <Link href="/workout">
                    <FaPlus className='h-5 w-5' />
                </Link>
            </li>
            <li>
                <Link href="/history">
                    <FaCalendar className='h-5 w-5' />
                </Link>
            </li>
            <li>
                <Link href="/exercises">
                    <FaDumbbell className="h-5 w-5" />
                </Link>
            </li>
        </ul>
    )
}

export default MobileNavBar