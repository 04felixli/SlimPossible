import React, { ReactNode } from 'react';
import MobileNavBar from './MobileNavBar';

interface LayoutProps {
    children: ReactNode;
}

const PageLayout = (props: LayoutProps) => {
    return (
        <section className='w-10/12 pt-20 flex justify-center'>
            <div className='w-full pb-36'>{props.children}</div>
            <div className='fixed bottom-10 z-50'>
                <MobileNavBar />
            </div>
        </section>
    );
}

export default PageLayout