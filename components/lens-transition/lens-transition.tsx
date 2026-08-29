"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export function LensTransition() {
  const reduceMotion = useReducedMotion();
  // const [finished, setFinished] = useState(false);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
    <motion.div
      aria-hidden="true"
      className="opening-transition"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 2.65, times: [0, 0.9, 1], ease: "linear" }}
      // onAnimationComplete={() => setFinished(true)}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="opening-transition__dot"
        initial={{ scale: 0.07 }}
        animate={{ scale: 32 }}
        transition={{
          delay: 0.55,
          duration: 1.65,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </motion.div>
    </AnimatePresence>
  );
}
