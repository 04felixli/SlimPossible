import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

const dashboard = async () => {
    const { isAuthenticated } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) {
        redirect("api/auth/login");
    }
    return (
        <>
            <div className="text-xl">You should not be able to see this page</div>
            <Link href="/workout">Workout</Link>
            <Link href="/history">History</Link>
            <Link href="/exercises">Exercises</Link>
        </>
    )
}

export default dashboard