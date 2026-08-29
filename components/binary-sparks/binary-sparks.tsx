"use client";

import { motion } from "framer-motion";
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

type PhaseType = "Scatter" | "Converge" | "flash" | "Reveal" | "Rest"

export function BinarySparks() {

    const [digits, setDigits] = useState<Digit[]>([]);
    const [phase, setPhase] = useState<PhaseType>("Scatter");

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
        <div className="flex relative h-72 w-72 overflow-hidden items-center justify-center"> 
            {digits.map((digit) => (
                <motion.span
                key={digit.id}
                className="absolute font-mono text-blue-400"
                style={{
                    fontSize: digit.size,
                    textShadow: "0 0 8px #286eff",
                }}
                animate={phase === "Scatter" ? {
                        left: `${digit.x}%`,
                        top: `${digit.y}%`,
                        x: [0, digit.driftX * 0.3, digit.driftX],
                        y: [20, digit.driftY * 0.4, digit.driftY],
                        opacity: [0, 0.9, 0.15, 1, 0],
                        scale: [0.7, 1, 0.85],
                    } : {
                        left: "50%",
                        top: "50%",
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 0.5,
                    }
                }
                transition={phase === "Scatter" ? {
                        duration: digit.duration,
                        delay: digit.delay,
                        repeat: Infinity,
                        repeatDelay: Math.random(),
                        ease: "easeOut",
                    } : {
                        duration: 0.8,
                        delay: digit.delay * 0.1,
                        ease: "easeIn",
                    }
                }
                >
                    {digit.value}
                </motion.span>
            ))}
            <button onClick= {() => setPhase("Converge")} className="text-white">
                Button
            </button>
        </div>

        
    );
}
