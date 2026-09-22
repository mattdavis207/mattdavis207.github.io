import Image from "next/image";
import type { ReactNode } from "react";

type LinkCardProps = {
  href: string;
  imageSrc?: string;
  icon?: ReactNode;
  title: string;
  description: string;
  newTab?: boolean;
};

export function LinkCard({ href, imageSrc, icon, title, description, newTab = false }: LinkCardProps) {
  return (
    <div className="w-full max-w-xs [perspective:1000px]">
      <a
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className="group relative block w-full border border-sky-400/40 bg-sky-950/40 p-4 text-left font-mono transition-all duration-300 [transform-style:preserve-3d] hover:border-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] motion-safe:hover:[transform:rotateX(6deg)_rotateY(-6deg)_translateZ(12px)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 motion-reduce:transition-none"
      >
        {/* Offset border preserves the original card's depth on hover. */}
        <div className="pointer-events-none absolute inset-0 -z-10 border border-dashed border-sky-500/20 bg-sky-900/10 transition-transform duration-300 motion-safe:group-hover:[transform:translateZ(-16px)_scale(0.98)] motion-reduce:transition-none" />

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-sky-500/30 bg-sky-950 [transform:translateZ(10px)] group-hover:border-sky-400 group-hover:bg-sky-900">
            {imageSrc ? (
              <Image src={imageSrc} alt="" width={24} height={24} unoptimized className="h-6 w-6 object-contain" />
            ) : icon}
          </div>
          <div className="min-w-0 space-y-1 [transform:translateZ(5px)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-300">{title}</h3>
            <p className="text-xs leading-relaxed text-sky-400/80 group-hover:text-sky-300">{description}</p>
          </div>
        </div>
      </a>
    </div>
  );
}
