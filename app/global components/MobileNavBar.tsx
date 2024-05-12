import React from 'react'
import { FaDumbbell } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";

const MobileNavBar = () => {
    return (
        <ul className="menu menu-horizontal bg-button-color rounded-box">
            <li>
                <a>
                    <CgProfile className="h-5 w-5" />
                </a>
            </li>
            <li>
                <a>
                    <FaPlus className='h-5 w-5' />
                </a>
            </li>
            <li>
                <a>
                    <FaDumbbell className="h-5 w-5" />
                </a>
            </li>
            <li>
                <a>
                    <FaChartPie className="h-5 w-5" />
                </a>
            </li>
        </ul>
    )
}

export default MobileNavBar