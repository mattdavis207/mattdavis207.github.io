type ExperienceCardProps = {
  title: string;
  company: string;
  role?: string;
  description: string;
  dates?: string;
  location?: string;
};

export function ExperienceCard({
  title,
  company,
  role,
  description,
  dates,
  location,
}: ExperienceCardProps) {
  return (
    <article className="w-full min-w-0 border border-sky-400/40 bg-sky-950/40 p-5 font-mono whitespace-normal">
      {/* Dates sit beside the heading when there is room, or wrap below it. */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 break-words">
          <h3 className="text-lg font-bold text-sky-300">{title}</h3>
          <p className="mt-1 text-sm text-sky-400">{company}</p>
        </div>
        {dates && (
          <span className="border border-sky-800 bg-sky-950 px-2 py-1 text-xs text-sky-300">
            {dates}
          </span>
        )}
      </div>

      {(role || location) && (
        <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-slate-400">
          {role && <span className="text-sky-200">{role}</span>}
          {location && <span>{location}</span>}
        </div>
      )}

      <p className="mt-4 border-t border-sky-900 pt-4 text-sm leading-relaxed break-words whitespace-pre-line text-slate-300">
        {description}
      </p>
    </article>
  );
}
