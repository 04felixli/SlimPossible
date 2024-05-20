'use client';
import React, { useState, useEffect } from 'react';
import '../../../globals.css';

const Timer = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Update seconds
            setSeconds(prevSeconds => {
                if (prevSeconds === 59) {
                    // If seconds reach 59, reset seconds to 0 and update minutes
                    setMinutes(prevMinutes => {
                        if (prevMinutes === 59) {
                            // If minutes reach 59, reset minutes to 0 and update hours
                            setHours(prevHours => prevHours + 1);
                            return 0;
                        } else {
                            return prevMinutes + 1;
                        }
                    });
                    return 0;
                } else {
                    return prevSeconds + 1;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='thin-font'>
            <p>{`${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m:${seconds.toString().padStart(2, '0')}s`}</p>
        </div>
    );
};

export default Timer;
