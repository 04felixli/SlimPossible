import Link from 'next/link'
import React from 'react'

const dashboard = async () => {

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