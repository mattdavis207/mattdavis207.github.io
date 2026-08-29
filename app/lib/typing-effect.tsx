"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect} from "react";

type TypingEffectProps = {
  active: boolean;
  instant?: boolean;
  speed?: number;
  text: string;
};

export default function TypingEffect({
  active,
  instant = false,
  speed = 0.018,
  text,
}: TypingEffectProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    count.set(0);

    if (!active) {
      return;
    }

    if (instant) {
      count.set(text.length);
      return;
    }

    const controls = animate(count, text.length, {
      type: "tween",
      duration: Math.max(0.35, text.length * speed),
      ease: "linear",
    });

    return controls.stop;
  }, [active, count, instant, speed, text]);

  return (
    <span className="typing-effect" aria-label={text}>
      <motion.span aria-hidden="true">{displayText}</motion.span>
      {active && !instant && (
        <motion.span
          className="typing-effect__cursor"
          aria-hidden="true"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
        >
          
        </motion.span>
      )}
    </span>
  );
}
