"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function LensTransition() {
  const motionPreference = useReducedMotion();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [finished, setFinished] = useState(false);

  // Apply the browser preference after hydration so the first renders match.
  useEffect(() => {
    setReduceMotion(Boolean(motionPreference));
  }, [motionPreference]);

  if (reduceMotion || finished) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-100 overflow-hidden bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 2.65, times: [0, 0.9, 1], ease: "linear" }}
      onAnimationComplete={() => setFinished(true)}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -mt-[5vmax] -ml-[5vmax] size-[10vmax] rounded-full bg-black will-change-transform"
        initial={{ scale: 0.07 }}
        animate={{ scale: 32 }}
        transition={{
          delay: 0.55,
          duration: 1.65,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </motion.div>
  );
}
