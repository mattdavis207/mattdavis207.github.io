"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useState, type ReactNode } from "react";
import TypingEffect from "@/app/lib/typing-effect";

type Spark = {
  id: number;
  value: "0" | "1";
  startX: number;
  startY: number;
  scatterX: number;
  scatterY: number;
  targetX: number;
  targetY: number;
  size: number;
};

type RevealRange = [number, number, number, number];

type AboutProps = {
  scrollProgress: MotionValue<number>;
};

type BinaryRevealProps = {
  children: ReactNode;
  className: string;
  progress: MotionValue<number>;
  range: RevealRange;
  reduceMotion: boolean;
  sparks: Spark[];
};

type AnimatedSparkProps = {
  progress: MotionValue<number>;
  range: RevealRange;
  spark: Spark;
};

function randomFrom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43_758.5453;
  return value - Math.floor(value);
}

function createSparks(count: number, seed: number): Spark[] {
  return Array.from({ length: count }, (_, id) => {
    const angle = randomFrom(seed + id * 7) * Math.PI * 2;
    const startRadius = 8 + randomFrom(seed + id * 11) * 22;
    const scatterRadius = 65 + randomFrom(seed + id * 17) * 115;

    return {
      id,
      value: randomFrom(seed + id * 23) > 0.5 ? "1" : "0",
      startX: Math.cos(angle) * startRadius,
      startY: Math.sin(angle) * startRadius,
      scatterX: Math.cos(angle) * scatterRadius,
      scatterY: Math.sin(angle) * scatterRadius * 0.58,
      targetX: (randomFrom(seed + id * 29) - 0.5) * 34,
      targetY: (randomFrom(seed + id * 31) - 0.5) * 18,
      size: 8 + randomFrom(seed + id * 37) * 7,
    };
  });
}

const headingSparks = createSparks(38, 17);
const leftCopySparks = createSparks(30, 47);
const rightCopySparks = createSparks(30, 83);
const experienceCopy =
     "I am a Computer Science student at the University of Pittsburgh with professional experience in software engineering and AI development. I've spent two summers at Vertex working on enterprise software, API modernization, and AI-assisted development."
const interestsCopy =
  "I'm especially interested in artificial intelligence, software systems, automation, and exploring new ways to build with emerging technologies.";

function AnimatedSpark({ progress, range, spark }: AnimatedSparkProps) {
  const x = useTransform(
    progress,
    range,
    [spark.startX, spark.scatterX, spark.targetX, spark.targetX],
  );
  const y = useTransform(
    progress,
    range,
    [spark.startY, spark.scatterY, spark.targetY, spark.targetY],
  );
  const opacity = useTransform(progress, range, [0, 0.8, 0.72, 0]);
  const scale = useTransform(progress, range, [0.55, 1, 0.7, 0.25]);

  return (
    <motion.span
      className="about-binary-reveal__spark"
      style={{ x, y, opacity, scale, fontSize: spark.size }}
    >
      {spark.value}
    </motion.span>
  );
}

function BinaryReveal({
  children,
  className,
  progress,
  range,
  reduceMotion,
  sparks,
}: BinaryRevealProps) {
  const revealAt = range[2];
  const revealCompleteAt = range[3];
  const contentOpacity = useTransform(
    progress,
    [0, revealAt, revealCompleteAt, 1],
    reduceMotion ? [1, 1, 1, 1] : [0, 0, 1, 1],
  );
  const contentY = useTransform(
    progress,
    [0, revealAt, revealCompleteAt, 1],
    reduceMotion ? [0, 0, 0, 0] : [12, 12, 0, 0],
  );
  const contentFilter = useTransform(
    progress,
    [0, revealAt, revealCompleteAt, 1],
    reduceMotion
      ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
      : ["blur(8px)", "blur(8px)", "blur(0px)", "blur(0px)"],
  );

  return (
    <div className={`about-binary-reveal ${className}`}>
      {!reduceMotion && (
        <div className="about-binary-reveal__particles" aria-hidden="true">
          {sparks.map((spark) => (
            <AnimatedSpark
              key={spark.id}
              progress={progress}
              range={range}
              spark={spark}
            />
          ))}
        </div>
      )}

      <motion.div
        className="about-binary-reveal__content"
        style={{ opacity: contentOpacity, y: contentY, filter: contentFilter }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function About({ scrollProgress }: AboutProps) {
  const reduceMotion = !!useReducedMotion();
  const [experienceTypingActive, setExperienceTypingActive] = useState(
    () => scrollProgress.get() >= 0.78,
  );
  const [interestsTypingActive, setInterestsTypingActive] = useState(
    () => scrollProgress.get() >= 0.86,
  );

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    const nextExperienceActive = latest >= 0.78;
    const nextInterestsActive = latest >= 0.86;

    setExperienceTypingActive((current) =>
      current === nextExperienceActive ? current : nextExperienceActive,
    );
    setInterestsTypingActive((current) =>
      current === nextInterestsActive ? current : nextInterestsActive,
    );
  });

  return (
    <div className="about-scene">
      <div className="about-scene__content">
        <BinaryReveal
          className="about-scene__heading"
          progress={scrollProgress}
          range={[0.42, 0.52, 0.66, 0.74]}
          reduceMotion={reduceMotion}
          sparks={headingSparks}
        >
          <h2>About</h2>
          <div className="about-scene__rule" aria-hidden="true" />
        </BinaryReveal>

        <BinaryReveal
          className="about-scene__copy about-scene__copy--left"
          progress={scrollProgress}
          range={[0.56, 0.66, 0.78, 0.86]}
          reduceMotion={reduceMotion}
          sparks={leftCopySparks}
        >
          <p>
            <TypingEffect
              active={experienceTypingActive}
              instant={reduceMotion}
              text={experienceCopy}
            />
          </p>
        </BinaryReveal>

        <BinaryReveal
          className="about-scene__copy about-scene__copy--right"
          progress={scrollProgress}
          range={[0.64, 0.74, 0.86, 0.94]}
          reduceMotion={reduceMotion}
          sparks={rightCopySparks}
        >
          <p>
            <TypingEffect
              active={interestsTypingActive}
              instant={reduceMotion}
              text={interestsCopy}
            />
          </p>
        </BinaryReveal>
      </div>
    </div>
  );
}
