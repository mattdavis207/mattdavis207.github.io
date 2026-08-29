"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { BinarySparks } from "@/components/binary-sparks/binary-sparks";

export function VirtualJourney(){

    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0vw", "-500vw"]
    );

    return(
        <section ref={sectionRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full w-[600vw]"
        >  
            <BinarySparks /> 
            <About/>
            {/* <SceneTwo />
            <SceneThree />
            <SceneFour />
            <SceneFive />
            <SceneSix /> */}
        </motion.div>
      </div>
    </section>
    )
}

