"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function About() {
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(contentRef, { amount: 0.45 });
  const reduceMotion = useReducedMotion();

  return (
    <div className="about-scene">
      <motion.div
        ref={contentRef}
        className="about-scene__content"
        initial={reduceMotion ? false : { opacity: 0, x: 56 }}
        animate={
          inView || reduceMotion
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: 56 }
        }
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="about-scene__eyebrow">Scene 02</span>
        <h2>About</h2>
        <div className="about-scene__rule" aria-hidden="true" />
      </motion.div>
    </div>
  );
}
