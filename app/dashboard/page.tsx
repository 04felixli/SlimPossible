import { getKindeServerSession, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'
import SideBar from '../global components/Navigation/SideBar';
import SideBarItem from '../global components/Navigation/SideBarItem';
import { FaCalendar, FaDumbbell, FaPlus } from 'react-icons/fa';
import { MdOutlineDashboard } from "react-icons/md";
import PageLayout from '../global components/PageLayouts/layout';

const dashboard = async () => {
    return (
        <PageLayout activePage='/dashboard'>
            <div>
                hi
            </div>
        </PageLayout>

    )
}

export default dashboard