import type { ButtonHTMLAttributes, ReactNode } from "react";

type DialogueBoxProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function DialogueBox({ title, subtitle, children, footer }: DialogueBoxProps) {
  return (
    <div className="relative w-full min-w-0 overflow-hidden border border-sky-500/20 bg-slate-950 p-6 font-mono text-slate-300">
      {/* Faint grid behind the content. */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="pointer-events-none select-none text-xs text-sky-500/40">
        <span className="absolute top-1 left-1">+</span>
        <span className="absolute top-1 right-1">−</span>
        <span className="absolute bottom-1 left-1">−</span>
        <span className="absolute bottom-1 right-1">+</span>
      </div>

      <div className="relative">
        <h2 className="text-lg font-bold text-sky-300">{title}</h2>
        {subtitle && <p className="mt-1 text-xs uppercase tracking-widest text-sky-500">{subtitle}</p>}
        <div className="mt-6 space-y-4 text-base leading-relaxed">{children}</div>
        {footer && <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-sky-900 pt-4">{footer}</div>}
      </div>
    </div>
  );
}

// Shared styling for the panel's navigation buttons.
export function DialogueButton({ children, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button
      {...props}
      type="button"
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer border border-sky-800 bg-sky-950 px-4 py-3 font-mono text-sm text-sky-300 enabled:hover:border-sky-400 enabled:hover:bg-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:cursor-default disabled:opacity-40"
    >
      {children}
    </button>
  );
}
