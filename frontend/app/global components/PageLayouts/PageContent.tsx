import React, { ReactNode } from 'react';
import { MotionDiv } from '../MotionDiv';

interface Props {
    children: ReactNode;
    isExpanded: boolean;
}

const PageContent = ({ children, isExpanded }: Props) => {
    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };
    return (
        <section
            className={`flex-grow pt-20 flex justify-center px-[5%] md:px-[10%] transition-margin duration-300 h-full ${isExpanded ? 'lg:ml-64 xl:ml-52' : 'lg:ml-16'}`}
        >
            <div className='w-full pb-36'>
                <MotionDiv
                    className='w-full h-full'
                    initial="hidden"
                    animate="visible"
                    variants={fadeVariants}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {children}
                </MotionDiv>
            </div>
        </section>
    )
}

export default PageContent;
