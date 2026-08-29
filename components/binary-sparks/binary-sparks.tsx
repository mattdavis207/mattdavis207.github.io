"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Digit = {
    id: number,
    value: "0" | "1", 
    x: number, 
    y: number, 
    driftX: number,
    driftY: number;
    size: number;
    duration: number;
    delay: number;
}

export function BinarySparks() {

    const [digits, setDigits] = useState<Digit[]>([]);

    useEffect(() => {
        setDigits(
        Array.from({length: 80}, (_, id) => ({
            id, 
            value: Math.random() > 0.5 ? "1" : "0",
            x: Math.random() * 100,
            y: Math.random() * 100,
            driftX: (Math.random() - 0.5) * 100,
            driftY: -30 - Math.random() * 100,
            size: 8 + Math.random() * 16,
            duration: 1.5 + Math.random() * 3,
            delay: Math.random() * 3,
        })
        ))
    
    }, []);
    

    return (
        // bg-[#020712]
        <div className="relative h-72 w-72 overflow-hidden"> 
            {digits.map((digit) => (
                <motion.span
                key={digit.id}
                className="absolute font-mono text-blue-400"
                style={{
                    left: `${digit.x}%`,
                    top: `${digit.y}%`,
                    fontSize: digit.size,
                    textShadow: "0 0 8px #286eff",
                }}
                animate={{
                    x: [0, digit.driftX * 0.3, digit.driftX],
                    y: [20, digit.driftY * 0.4, digit.driftY],
                    opacity: [0, 0.9, 0.15, 1, 0],
                    scale: [0.7, 1, 0.85],
                }}
                transition={{
                    duration: digit.duration,
                    delay: digit.delay,
                    repeat: Infinity,
                    repeatDelay: Math.random(),
                    ease: "easeOut",
                }}
                >
                {digit.value}
                </motion.span>
            ))}
        </div>

        
    );
}