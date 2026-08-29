"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type TravelerProps = {
  visible: boolean;
  reduceMotion: boolean;
};

export default function Traveler({
  visible,
  reduceMotion,
}: TravelerProps) {
  const duration = reduceMotion ? 0 : 0.9;

  return (
    <div
      className="traveler"
      aria-hidden={!visible}
      data-visible={visible}
    >
      <motion.div
        className="traveler__message"
        role="status"
        aria-live="polite"
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
        <span className="traveler__message-label">The Traveler</span>
        <p>Welcome to Matt&apos;s virtual world.</p>
        <span className="traveler__message-hint">
          Stay curious. There&apos;s more here than first appears.
        </span>
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
    </div>
  );
}
