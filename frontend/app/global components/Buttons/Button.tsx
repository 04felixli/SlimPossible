'use client';
import React from 'react'
import { motion } from 'framer-motion';
import './button.css';

interface Props {
    text: string;
    onClickFunction?: () => void; // Make onClickFunction optional
    className?: string; // Additional styles if needed
}

const Button = (props: Props) => {
    // Temporary default function if none is provided
    const handleClick = () => {
        console.log("Default button click!");
    };

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
            className={`px-6 py-0.5 rounded-full relative radial-gradient shadow-lg ${props.className}`}
            onClick={onClick}
        >
            <span className="tracking-wide h-full w-full block relative linear-mask">
                {props.text}
            </span>
            <span className="block absolute inset-0 rounded-full p-px linear-overlay" />
        </motion.button>
    )
}

export default Button