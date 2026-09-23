"use client";

import { createNoise3D } from "simplex-noise";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  velocityX: number;
  velocityY: number;
};

type Pointer = {
  x: number;
  y: number;
  pressed: boolean;
};

const MAX_PARTICLES = 10_000;
const MIN_PARTICLES = 3_500;
const TRAIL_DECAY = 0.14;

export function MagneticField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    if (!canvasNode) return;

    const contextNode = canvasNode.getContext("2d");
    if (!contextNode) return;

    const canvas: HTMLCanvasElement = canvasNode;
    const context: CanvasRenderingContext2D = contextNode;

    const noise3D = createNoise3D();
    const particles: Particle[] = [];
    const pointer: Pointer = { x: 0, y: 0, pressed: false };
    const canvasStyles = getComputedStyle(canvas);
    const fieldColor =
      canvasStyles.getPropertyValue("--field-color").trim() || "#0ea5e9";
    const fieldBackground =
      canvasStyles.getPropertyValue("--field-background").trim() || "#020617";

    let width = 0;
    let height = 0;
    let animationFrame = 0;

    function resetParticle(particle: Particle) {
      let x: number;
      let y: number;

      if (Math.random() < 0.5) {
        x = width * Math.random();
        y = height * (Math.random() < 0.5 ? 0 : 1);
      } else {
        x = width * (Math.random() < 0.5 ? 0 : 1);
        y = height * Math.random();
      }

      particle.x = x;
      particle.y = y;
      particle.lastX = x;
      particle.lastY = y;
      particle.velocityX = 0;
      particle.velocityY = 0;
    }

    function makeParticle(): Particle {
      const particle: Particle = {
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0,
        velocityX: 0,
        velocityY: 0,
      };

      resetParticle(particle);
      return particle;
    }

    function clear() {
      context.globalCompositeOperation = "source-over";
      context.fillStyle = fieldBackground;
      context.fillRect(0, 0, width, height);
    }

    function fadePreviousFrames() {
      context.globalCompositeOperation = "source-over";
      context.globalAlpha = TRAIL_DECAY;
      context.fillStyle = fieldBackground;
      context.fillRect(0, 0, width, height);
      context.globalAlpha = 1;
    }

    function resize() {
      const nextWidth = Math.max(1, Math.floor(canvas.clientWidth));
      const nextHeight = Math.max(1, Math.floor(canvas.clientHeight));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const nextCanvasWidth = Math.floor(nextWidth * pixelRatio);
      const nextCanvasHeight = Math.floor(nextHeight * pixelRatio);

      if (
        canvas.width === nextCanvasWidth &&
        canvas.height === nextCanvasHeight
      ) {
        return;
      }

      width = nextWidth;
      height = nextHeight;
      canvas.width = nextCanvasWidth;
      canvas.height = nextCanvasHeight;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      clear();

      const targetCount = Math.min(
        MAX_PARTICLES,
        Math.max(MIN_PARTICLES, Math.floor((width * height) / 150)),
      );

      while (particles.length < targetCount) particles.push(makeParticle());
      if (particles.length > targetCount) particles.length = targetCount;
    }

    function isOutOfBounds(particle: Particle) {
      return (
        particle.x < 0 ||
        particle.x > width ||
        particle.y < 0 ||
        particle.y > height
      );
    }

    function updateParticle(particle: Particle, now: number) {
      if (isOutOfBounds(particle)) {
        resetParticle(particle);
        return false;
      }

      const x = particle.x * 0.005;
      const y = particle.y * 0.005;
      const z = now * 0.0001;
      const drift = Math.random() * 0.25;
      const angle = Math.random() * Math.PI * 2;

      particle.velocityX +=
        drift * Math.sin(angle) + noise3D(x, y, z);
      particle.velocityY +=
        drift * Math.cos(angle) + noise3D(x, y, -z);

      if (pointer.pressed) {
        particle.velocityX += (pointer.x - particle.x) * 0.001;
        particle.velocityY += (pointer.y - particle.y) * 0.001;
      }

      particle.velocityX *= 0.95;
      particle.velocityY *= 0.95;
      particle.lastX = particle.x;
      particle.lastY = particle.y;
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      return true;
    }

    function render(now: number) {
      resize();
      fadePreviousFrames();
      context.beginPath();

      for (const particle of particles) {
        if (!updateParticle(particle, now)) continue;

        context.moveTo(particle.lastX, particle.lastY);
        context.lineTo(particle.x, particle.y);
      }

      context.globalCompositeOperation = "lighter";
      context.strokeStyle = fieldColor;
      context.globalAlpha = 0.22;
      context.lineWidth = 0.75;
      context.stroke();
      context.globalAlpha = 1;

      animationFrame = window.requestAnimationFrame(render);
    }

    function updatePointer(event: PointerEvent) {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    }

    function handlePointerDown(event: PointerEvent) {
      if (event.button !== 0) return;
      updatePointer(event);
      pointer.pressed = true;
    }

    function handlePointerUp() {
      pointer.pressed = false;
    }

    window.addEventListener("pointermove", updatePointer);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    resize();
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-svh w-full overflow-hidden bg-[var(--field-background)]">
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
