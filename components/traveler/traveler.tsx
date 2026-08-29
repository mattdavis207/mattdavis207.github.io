"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type TravelerProps = {
  visible: boolean;
  reduceMotion: boolean;
  scrollProgress: MotionValue<number>;
};

export default function Traveler({
  visible,
  reduceMotion,
  scrollProgress,
}: TravelerProps) {
  const duration = reduceMotion ? 0 : 0.9;
  const [walkingStarted, setWalkingStarted] = useState(
    () => scrollProgress.get() >= 0.24,
  );
  const [aboutMessageShown, setAboutMessageShown] = useState(
    () => scrollProgress.get() >= 0.6,
  );
  const standingOpacity = useTransform(
    scrollProgress,
    [0, 0.1, 0.24],
    reduceMotion ? [1, 1, 1] : [1, 1, 0],
  );
  const walkingOpacity = useTransform(
    scrollProgress,
    [0, 0.1, 0.24],
    reduceMotion ? [0, 0, 0] : [0, 0, 1],
  );
  const walkingBob = useTransform(
    scrollProgress,
    [0.1, 0.22, 0.34, 0.46, 0.58, 0.7, 0.82, 0.94, 1],
    reduceMotion
      ? [0, 0, 0, 0, 0, 0, 0, 0, 0]
      : [0, -5, 0, -5, 0, -5, 0, -5, 0],
  );

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    const nextWalkingStarted = latest >= 0.24;
    const nextAboutMessageShown = latest >= 0.6;

    setWalkingStarted((current) =>
      current === nextWalkingStarted ? current : nextWalkingStarted,
    );
    setAboutMessageShown((current) =>
      current === nextAboutMessageShown ? current : nextAboutMessageShown,
    );
  });

  return (
    <div
      className="traveler"
      aria-hidden={!visible}
      data-visible={visible}
    >
      <motion.div
        className="traveler__message-scroll"
        initial={false}
        animate={
          visible
            ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, y: 14, scale: 0.96, filter: "blur(8px)" }
        }
        transition={{
          delay: visible && !reduceMotion ? 0.65 : 0,
          duration: reduceMotion ? 0 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="traveler__message" role="status" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={aboutMessageShown ? "about" : "welcome"}
              className="traveler__message-copy"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 7, filter: "blur(5px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -7, filter: "blur(5px)" }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {aboutMessageShown ? (
                <>
                  <span className="traveler__message-label">
                    The Traveler
                  </span>
                  <p>Here&apos;s a little about Matt.</p>
                  <span className="traveler__message-hint">
                    Student, software engineer, and AI builder.
                  </span>
                </>
              ) : (
                <>
                  <span className="traveler__message-label">The Traveler</span>
                  <p>Welcome to Matt&apos;s virtual world.</p>
                  <span className="traveler__message-hint">
                    Let&apos;s see what&apos;s here.
                  </span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        className="traveler__figure"
        initial={false}
        animate={
          visible
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px) brightness(1)",
                clipPath: "inset(0% 0% 0% 0%)",
              }
            : {
                opacity: 0,
                y: 80,
                scale: 0.82,
                filter: "blur(18px) brightness(1.8)",
                clipPath: "inset(100% 0% 0% 0%)",
              }
        }
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="traveler__arrival-ring"
          aria-hidden="true"
          initial={false}
          animate={
            visible && !reduceMotion
              ? { opacity: [0, 0.85, 0], scaleX: [0.25, 1.15, 1.5] }
              : { opacity: 0, scaleX: 0.25 }
          }
          transition={{ duration: 1.1, ease: "easeOut" }}
        />

        <motion.div
          className="traveler__pose traveler__pose--standing"
          style={{ opacity: walkingStarted ? 0 : standingOpacity }}
        >
          <Image
            className="traveler__image"
            src="/images/traveler-v3.png"
            alt="The Traveler turning back and offering a welcoming hand"
            width={1024}
            height={1536}
            sizes="(max-width: 640px) 72vw, 32rem"
            priority
            unoptimized
          />
        </motion.div>

        <motion.div
          className="traveler__pose traveler__pose--walking"
          style={{
            opacity: walkingStarted ? 1 : walkingOpacity,
            y: walkingBob,
          }}
        >
          <Image
            className="traveler__image"
            src="/images/traveler-walk-right.png"
            alt="The Traveler walking toward the next scene"
            width={1024}
            height={1536}
            sizes="(max-width: 640px) 72vw, 32rem"
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
