'use client';
import React from 'react';
import { motion } from 'framer-motion';
import './button.css';

interface Props {
    text: string;
    onClickFunction?: () => void; // Make onClickFunction optional
    className?: string; // Additional styles if needed
    name?: string;
    value?: string;
}

const Button = (props: Props) => {
    // Default function if none is provided
    const handleClick = () => { };

    const onClick = props.onClickFunction || handleClick;

    return (
        <motion.button
            // @ts-ignore
            initial={{ "--x": "100%", scale: 1 }}
            // @ts-ignore
            animate={{ "--x": "-100%" }}
            whileTap={{ scale: 0.97 }}
            transition={{
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 10,
                type: "spring",
                stiffness: 20,
                damping: 15,
                mass: 2,
                scale: {
                    type: "spring",
                    stiffness: 10,
                    damping: 5,
                    mass: 0.1,
                },
            }}
            className={`px-6 py-0.5 rounded-md relative radial-gradient shadow-lg ${props.className}`}
            onClick={onClick}
            type='submit'
            name={props.name ? props.name : 'default-button'}
            value={props.value || ''}
        >
            <span className="tracking-wide h-full w-full block relative linear-mask">
                {props.text}
            </span>
            <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
        </motion.button>
    )
}

export default Button