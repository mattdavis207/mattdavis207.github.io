"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Phone,
  Star,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const navigationItems: Array<{
  label: string;
  preview: string;
  icon: LucideIcon;
}> = [
  {
    label: "About me",
    preview: "A little context for the curious.",
    icon: UserRound,
  },
  {
    label: "Experience",
    preview: "The work, roles, and useful detours.",
    icon: Star,
  },
  {
    label: "Education",
    preview: "Where the questions started.",
    icon: GraduationCap,
  },
  {
    label: "Projects",
    preview: "Selected things made with intent.",
    icon: BookOpen,
  },
  {
    label: "Contact",
    preview: "Start a thoughtful conversation.",
    icon: Phone,
  },
];

function RefractionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    const sourceNode = document.querySelector<HTMLCanvasElement>(
      ".magnetic-field__canvas",
    );
    if (!canvasNode || !sourceNode) return;

    const contextNode = canvasNode.getContext("2d");
    if (!contextNode) return;

    // Keep explicitly typed aliases for the animation closure. These values
    // cannot change after the effect has mounted and its guards have passed.
    const canvas: HTMLCanvasElement = canvasNode;
    const source: HTMLCanvasElement = sourceNode;
    const context: CanvasRenderingContext2D = contextNode;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const focus = { ...target };
    let animationFrame = 0;

    function followPointer(event: PointerEvent) {
      target.x = event.clientX;
      target.y = event.clientY;
    }

    function render() {
      const width = Math.max(1, Math.floor(canvas.clientWidth));
      const height = Math.max(1, Math.floor(canvas.clientHeight));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const backingWidth = Math.floor(width * pixelRatio);
      const backingHeight = Math.floor(height * pixelRatio);

      if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
        canvas.width = backingWidth;
        canvas.height = backingHeight;
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
      }

      focus.x += (target.x - focus.x) * 0.055;
      focus.y += (target.y - focus.y) * 0.055;

      const sourceBounds = source.getBoundingClientRect();
      const sourceScaleX = source.width / sourceBounds.width;
      const sourceScaleY = source.height / sourceBounds.height;
      const magnification = 1.72;
      const sampleWidth = Math.min(sourceBounds.width, width / magnification);
      const sampleHeight = Math.min(sourceBounds.height, height / magnification);
      const localPointerX = focus.x - sourceBounds.left;
      const localPointerY = focus.y - sourceBounds.top;
      const focalX =
        sourceBounds.width / 2 +
        (localPointerX - sourceBounds.width / 2) * 0.2;
      const focalY =
        sourceBounds.height / 2 +
        (localPointerY - sourceBounds.height / 2) * 0.2;
      const sampleX = Math.min(
        sourceBounds.width - sampleWidth,
        Math.max(0, focalX - sampleWidth / 2),
      );
      const sampleY = Math.min(
        sourceBounds.height - sampleHeight,
        Math.max(0, focalY - sampleHeight / 2),
      );

      context.globalCompositeOperation = "source-over";
      context.globalAlpha = 1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        source,
        sampleX * sourceScaleX,
        sampleY * sourceScaleY,
        sampleWidth * sourceScaleX,
        sampleHeight * sourceScaleY,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      context.globalCompositeOperation = "screen";
      context.fillStyle = "rgba(24, 70, 145, 0.12)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.globalCompositeOperation = "source-over";
      const vignette = context.createRadialGradient(
        canvas.width * 0.44,
        canvas.height * 0.4,
        canvas.width * 0.04,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.58,
      );
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(0.72, "rgba(0, 0, 0, 0.08)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.72)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, canvas.width, canvas.height);

      animationFrame = window.requestAnimationFrame(render);
    }

    window.addEventListener("pointermove", followPointer, { passive: true });
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", followPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="refraction-lens__canvas" aria-hidden="true" />;
}

export function RefractionLens() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    function revealLens() {
      setVisible(true);
    }

    window.addEventListener("opening-transition-complete", revealLens);
    return () =>
      window.removeEventListener("opening-transition-complete", revealLens);
  }, [reduceMotion]);

  return (
    <>
      <div
        className="refraction-lens-anchor"
        aria-label="An interactive refraction lens"
      >
        <motion.div
          className="refraction-lens"
          data-focused={activeItem ? "true" : "false"}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, scale: 0.92, rotate: -3, filter: "blur(12px)" }
          }
          animate={
            visible
              ? {
                  opacity: 1,
                  scale: activeItem ? 1.018 : 1,
                  rotate: activeItem ? 0.35 : 0,
                  filter: "blur(0px)",
                }
              : { opacity: 0, scale: 0.92, rotate: -3, filter: "blur(12px)" }
          }
          transition={{
            opacity: { duration: 2, ease: [0.22, 1, 0.36, 1] },
            filter: { duration: 1.7, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            rotate: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div className="refraction-lens__aperture">
            <RefractionCanvas />
          </div>

          <div className="refraction-lens__glass" aria-hidden="true" />
          <div className="refraction-lens__reticle" aria-hidden="true">
            <span />
          </div>

          <Image
            className="refraction-lens__frame"
            src="/images/lens-frame.png"
            alt=""
            fill
            priority
            unoptimized
            sizes="(max-width: 640px) 92vw, 48vw"
          />
        </motion.div>

        <motion.div
          className="identity-center"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{
            delay: reduceMotion ? 0 : 0.35,
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h1 className="identity-mark">
            <span>Matthew</span>
            <span>Davis</span>
          </h1>
          <div className="identity-preview" aria-live="polite">
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.p
                  key={activeItem}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {
                    navigationItems.find((item) => item.label === activeItem)
                      ?.preview
                  }
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.nav
        className="section-navigation"
        aria-label="Portfolio sections"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.7, duration: 1.4 }}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              className="section-navigation__item"
              onPointerEnter={() => setActiveItem(item.label)}
              onPointerLeave={() => setActiveItem(null)}
              onFocus={() => setActiveItem(item.label)}
              onBlur={() => setActiveItem(null)}
              onClick={() => setActiveItem(item.label)}
            >
              <span className="section-navigation__symbol" aria-hidden="true">
                <Icon strokeWidth={1.5} />
              </span>
              <span className="section-navigation__label">{item.label}</span>
            </button>
          );
        })}
      </motion.nav>
    </>
  );
}
