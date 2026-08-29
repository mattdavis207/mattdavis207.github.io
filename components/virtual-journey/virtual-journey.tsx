"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";

import { About } from "@/components/about/about";
import { BinarySparks } from "@/components/binary-sparks/binary-sparks";
import Traveler from "@/components/traveler/traveler";

const SCROLL_DISTANCE_PER_SCENE = 125;

export function VirtualJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const sceneCount = 2;
  const horizontalDistance = (sceneCount - 1) * 100;
  const journeyHeight =
    100 + (sceneCount - 1) * SCROLL_DISTANCE_PER_SCENE;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${horizontalDistance}vw`],
  );

  const scenes = [
    {
      id: "welcome",
      label: "Welcome",
      content: <BinarySparks onIntroComplete={handleIntroComplete} />,
    },
    {
      id: "about",
      label: "About",
      content: <About scrollProgress={scrollYProgress} />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="virtual-journey"
      style={{ height: `${journeyHeight}svh` }}
      aria-label="Matthew Davis portfolio journey"
    >
      <div className="virtual-journey__viewport">
        <motion.div
          className="virtual-journey__track"
          style={{
            x: rawX,
            width: `${sceneCount * 100}vw`,
          }}
        >
          {scenes.map((scene) => (
            <section
              key={scene.id}
              className="virtual-journey__scene"
              aria-label={`${scene.label} scene`}
              data-scene={scene.id}
            >
              {scene.content}
            </section>
          ))}
        </motion.div>

        <div
          className="virtual-journey__traveler-overlay"
          aria-label="The Traveler journey animation"
        >
          <Traveler
            visible={introComplete}
            reduceMotion={!!reduceMotion}
            scrollProgress={scrollYProgress}
          />
        </div>

        <div className="virtual-journey__progress" aria-hidden="true">
          <motion.div
            className="virtual-journey__progress-fill"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}
