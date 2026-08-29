"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import Traveler from "@/components/traveler/traveler";

type Digit = {
  id: number;
  value: "0" | "1";
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  targetX: number;
  targetY: number;
  size: number;
  duration: number;
  delay: number;
  repeatDelay: number;
};

type Phase =
  | "scatter"
  | "converge"
  | "flash"
  | "reveal"
  | "rest"
  | "settle"
  | "welcome";

const OPENING_TRANSITION_MS = 2_650;
const SCATTER_DURATION_MS = 1_800;
const CONVERGE_DURATION_MS = 900;
const FLASH_DURATION_MS = 300;
const REVEAL_DURATION_MS = 900;
const REST_HOLD_MS = 1_500;
const SETTLE_DURATION_MS = 1_100;

function createDigits(): Digit[] {
  return Array.from({ length: 90 }, (_, id) => ({
    id,
    value: Math.random() > 0.5 ? "1" : "0",
    x: Math.random() * 100,
    y: Math.random() * 100,
    driftX: (Math.random() - 0.5) * 90,
    driftY: -25 - Math.random() * 80,
    targetX: (Math.random() - 0.5) * 32,
    targetY: (Math.random() - 0.5) * 18,
    size: 8 + Math.random() * 15,
    duration: 1.4 + Math.random() * 1.8,
    delay: Math.random() * 1.1,
    repeatDelay: Math.random() * 0.55,
  }));
}

export function BinarySparks() {
  const reduceMotion = useReducedMotion();
  const [digits, setDigits] = useState<Digit[]>([]);
  const [phase, setPhase] = useState<Phase>("scatter");

  useEffect(() => {
    setDigits(createDigits());
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setPhase("welcome");
      return;
    }

    const convergeAt = OPENING_TRANSITION_MS + SCATTER_DURATION_MS;
    const flashAt = convergeAt + CONVERGE_DURATION_MS;
    const revealAt = flashAt + FLASH_DURATION_MS;
    const restAt = revealAt + REVEAL_DURATION_MS;
    const settleAt = restAt + REST_HOLD_MS;
    const welcomeAt = settleAt + SETTLE_DURATION_MS;

    const timers = [
      window.setTimeout(() => setPhase("converge"), convergeAt),
      window.setTimeout(() => setPhase("flash"), flashAt),
      window.setTimeout(() => setPhase("reveal"), revealAt),
      window.setTimeout(() => setPhase("rest"), restAt),
      window.setTimeout(() => setPhase("settle"), settleAt),
      window.setTimeout(() => setPhase("welcome"), welcomeAt),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [reduceMotion]);

  const isSettled = phase === "settle" || phase === "welcome";
  const showDigits =
    phase === "scatter" || phase === "converge" || phase === "flash";

  return (
    <section className="binary-sparks" aria-label="Matthew Davis introduction">
      <motion.div
        className="binary-sparks__stage"
        initial="center"
        animate={isSettled ? "settled" : "center"}
        variants={{
          center: {
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
            scale: 1,
          },
          settled: {
            left: "3vw",
            top: "3vh",
            x: 0,
            y: 0,
            scale: 0.45,
          },
        }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {showDigits && (
          <div className="binary-sparks__field" aria-hidden="true">
            {digits.map((digit) => (
              <motion.span
                key={digit.id}
                className="binary-sparks__digit"
                style={{
                  left: `${digit.x}%`,
                  top: `${digit.y}%`,
                  fontSize: digit.size,
                }}
                initial={{
                  x: 0,
                  y: 16,
                  opacity: 0,
                  scale: 0.6,
                }}
                animate={phase}
                variants={{
                  scatter: {
                    left: `${digit.x}%`,
                    top: `${digit.y}%`,
                    x: [0, digit.driftX * 0.3, digit.driftX],
                    y: [16, digit.driftY * 0.4, digit.driftY],
                    opacity: [0, 0.92, 0.18, 1, 0],
                    scale: [0.65, 1, 0.82],
                    transition: {
                      duration: digit.duration,
                      delay: digit.delay,
                      repeat: Infinity,
                      repeatDelay: digit.repeatDelay,
                      ease: "easeOut",
                    },
                  },
                  converge: {
                    left: "50%",
                    top: "50%",
                    x: digit.targetX,
                    y: digit.targetY,
                    opacity: 1,
                    scale: 0.62,
                    transition: {
                      duration: 0.68 + digit.delay * 0.15,
                      delay: digit.delay * 0.12,
                      ease: [0.7, 0, 0.84, 0],
                    },
                  },
                  flash: {
                    left: "50%",
                    top: "50%",
                    x: digit.targetX * 0.2,
                    y: digit.targetY * 0.2,
                    opacity: 0,
                    scale: 0.08,
                    transition: {
                      duration: 0.22,
                      ease: "easeIn",
                    },
                  },
                  reveal: { opacity: 0 },
                  rest: { opacity: 0 },
                  settle: { opacity: 0 },
                  welcome: { opacity: 0 },
                }}
              >
                {digit.value}
              </motion.span>
            ))}
          </div>
        )}

        <motion.div
          className="binary-sparks__flash"
          aria-hidden="true"
          initial={false}
          animate={phase}
          variants={{
            scatter: { opacity: 0, scale: 0.45 },
            converge: { opacity: 0, scale: 0.45 },
            flash: {
              opacity: [0, 1, 0.35],
              scale: [0.45, 1, 1.35],
              transition: { duration: 0.3, ease: "easeOut" },
            },
            reveal: {
              opacity: 0,
              scale: 1.55,
              transition: { duration: 0.3, ease: "easeOut" },
            },
            rest: { opacity: 0 },
            settle: { opacity: 0 },
            welcome: { opacity: 0 },
          }}
        />

        <motion.h1
          className="binary-sparks__name"
          initial="scatter"
          animate={phase}
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.90}}
          variants={{
            scatter: {
              opacity: 0,
              scale: 0.94,
              filter: "blur(14px)",
              letterSpacing: "0.06em",
            },
            converge: {
              opacity: 0,
              scale: 0.94,
              filter: "blur(14px)",
              letterSpacing: "0.06em",
            },
            flash: {
              opacity: 0,
              scale: 0.96,
              filter: "blur(10px)",
              letterSpacing: "0.04em",
            },
            reveal: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              letterSpacing: "-0.035em",
              textShadow:
                "0 0 12px rgba(90, 160, 255, 0.9), 0 0 36px rgba(40, 110, 255, 0.5)",
              transition: {
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              },
            },
            rest: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              letterSpacing: "-0.035em",
              textShadow:
                "0 0 9px rgba(90, 160, 255, 0.45), 0 0 24px rgba(40, 110, 255, 0.2)",
              transition: { duration: 0.7, ease: "easeOut" },
            },
            settle: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              letterSpacing: "-0.035em",
              textShadow: "0 0 16px rgba(40, 110, 255, 0.28)",
              transition: { duration: 0.8, ease: "easeOut" },
            },
            welcome: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              letterSpacing: "-0.035em",
              textShadow: "0 0 16px rgba(40, 110, 255, 0.28)",
            },
          }}
        >
          Matthew Davis
        </motion.h1>
      </motion.div>

      <Traveler visible={phase === "welcome"} reduceMotion={!!reduceMotion} />
    </section>
  );
}
