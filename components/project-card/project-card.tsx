"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa"

type ProjectCardProps = {
  title: string;
  imageSrc: string;
  description: string;
  href: string;
  imageAlt?: string;
  linkText?: string;
  newTab?: boolean;
  isExpanded?: boolean;
};

export function ProjectCard({
  title,
  imageSrc,
  description,
  href,
  imageAlt = title,
  linkText = "View project",
  newTab = false,
  isExpanded = false
}: ProjectCardProps) {

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0 : 0.3;

  useEffect(() => {
    if (isExpanded) {
      setExpanded(true); 
      setOpen(true);
    }
  }, [])

  return (
    <motion.article
      layout
      transition={{ duration }}
      className={`w-full flex max-w-full overflow-hidden border border-sky-400/40 bg-slate-950 font-mono whitespace-normal`}
    >
      {/* The same button rotates to become the bookmark tab */}
      <button
        type="button"
        disabled={expanded && !open}
        onClick={() => {
          if (!open) setExpanded(true);
          setOpen(!open);
        }}
        title={title}
        className={`${expanded ? "w-12 shrink-0 border-r border-sky-400/40" : "w-full min-h-12 px-4 py-3"} relative cursor-pointer bg-sky-950 text-sm font-bold text-sky-300 hover:bg-sky-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-300`}
      >
        <div className="flex flex-wrap gap-3 py-3">
          {!expanded ? <FaChevronRight size={16}/> : null}
          <span
            className={`${expanded ? "absolute top-1/2 left-1/2 w-60 -translate-x-1/2 -translate-y-1/2 -rotate-90" : "block max-w-full"} truncate transition-transform duration-300 motion-reduce:transition-none`}
          >
            {title}
          </span>
        </div>
        
      </button>

      {/* Fade out at full width, then shrink the empty card. */}
      <AnimatePresence initial={false} onExitComplete={() => setExpanded(false)}>
        {open && (
          <motion.div
            key="details"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.12 } }}
            transition={{ duration }}
            className="min-w-0 flex-1 overflow-hidden"
          >
            <div className="min-h-72 space-y-4 p-4 sm:p-6">
              <div className="relative aspect-video overflow-hidden border border-sky-800 bg-sky-950">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-contain"
                />
              </div>
              <p className="text-sm leading-relaxed break-words whitespace-pre-line text-slate-300">
                {description}
              </p>
              <a
                href={href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 border border-sky-800 bg-sky-950 px-3 py-2 text-sm text-sky-300 hover:border-sky-400 hover:bg-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                {linkText} <ArrowRight size={16}/>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
