"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { About } from "@/components/about/about";
import { BinarySparks } from "@/components/binary-sparks/binary-sparks";

const scenes = [
  {
    id: "welcome",
    label: "Welcome",
    content: <BinarySparks />,
  },
  {
    id: "about",
    label: "About",
    content: <About />,
  },
];

const SCROLL_DISTANCE_PER_SCENE = 125;

export function VirtualJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneCount = scenes.length;
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
          {scenes.map((scene, index) => (
            <section
              key={scene.id}
              className="virtual-journey__scene"
              aria-label={`${scene.label} scene`}
              data-scene={scene.id}
            >
              <span className="virtual-journey__scene-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {scene.content}
            </section>
          ))}
        </motion.div>

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
