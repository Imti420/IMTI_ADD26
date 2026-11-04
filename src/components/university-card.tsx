import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, StatusPill } from "@/components/marks";
import { SYSTEM_LABEL, TRACK_LABEL, type AppStatus, type Circular, type University } from "@/data/types";
import { cn } from "@/lib/cn";
import { daysUntil, formatDay } from "@/lib/dates";

export function earliestExam(circular: Circular | null): string | null {
  if (!circular) return null;
  const days = [...circular.units.map((unit) => unit.examDate), circular.examDate].filter((day): day is string => Boolean(day));
  if (!days.length) return null;
  return [...days].sort()[0] ?? null;
}

function shortDay(iso: string | null): string {
  if (!iso) return "—";
  return formatDay(iso).replace(/ \d{4}$/, "");
}

function Mark({ label, value, missing }: { label: string; value: string; missing: boolean }) {
  return (
    <div className="min-w-0 border-t border-ink pt-2">
      <p className="font-mono text-xs tracking-widest text-mute">{label}</p>
      <p className={cn("mt-1 truncate font-display text-2xl font-bold uppercase leading-none", missing && "text-mute")}>{value}</p>
    </div>
  );
}

export function UniversityCard({
  uni,
  related,
  status,
  index,
}: {
  uni: University;
  related: Circular[];
  status: AppStatus;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const primary = related[0] ?? null;
  const seats = primary?.seats ?? null;
  const exam = earliestExam(primary);
  const closes = primary?.applicationCloses ?? null;
  const units = primary?.units ?? [];
  const closeDays = closes ? daysUntil(closes) : null;
  const hot = status === "open" || (closeDays != null && closeDays >= 0 && closeDays <= 14);
  const nameSize = uni.shortName.length > 6 ? "text-3xl" : "text-5xl";

  return (
    <article
      className={cn(
        "card-doc flex flex-col border border-ink bg-paper p-4",
        hot && "border-l-4 border-l-accent",
        index < 9 && "rise",
      )}
      style={index < 9 ? { animationDelay: `${index * 45}ms` } : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-xs text-mute">{String(index + 1).padStart(2, "0")}</p>
        <StatusPill status={status} />
      </div>
      <Link to="/universities/$id" params={{ id: uni.id }} className="mt-3 block hover:text-accent">
        <h2 className={cn("font-display font-bold uppercase leading-none", nameSize)}>{uni.shortName}</h2>
        <p className="mt-2 text-sm">{uni.name}</p>
      </Link>
      <p className="mt-2 font-mono text-xs tracking-widest text-mute">
        {TRACK_LABEL[uni.track].toUpperCase()}
        {uni.city ? ` · ${uni.city.toUpperCase()}` : ""}
        {uni.kind === "system" ? " · SYSTEM" : ""}
      </p>
      {primary && primary.system !== "own" ? (
        <p className="mt-1 font-mono text-xs tracking-widest">CLUSTER · {SYSTEM_LABEL[primary.system].toUpperCase()}</p>
      ) : (
        <p className="mt-1 font-mono text-xs tracking-widest text-mute">
          {primary ? `CLUSTER · ${SYSTEM_LABEL[primary.system].toUpperCase()}` : "CLUSTER · NOT ON FILE"}
        </p>
      )}

      <div className="mt-4 grid grid-cols-3 gap-3">
        <Mark label="Seats" value={seats == null ? "—" : seats.toLocaleString("en-BD")} missing={seats == null} />
        <Mark label="Closes" value={shortDay(closes)} missing={!closes} />
        <Mark label="Exam" value={shortDay(exam)} missing={!exam} />
      </div>
      <div className="mt-1 grid grid-cols-3 gap-3">
        <p className="font-mono text-xs leading-tight text-mute">{seats == null ? "NOT ON FILE" : "ON CIRCULAR"}</p>
        <p className="font-mono text-xs leading-tight text-mute">{closes ? formatDay(closes) : "NOT ON FILE"}</p>
        <p className="font-mono text-xs leading-tight text-mute">{exam ? formatDay(exam) : "NOT ON FILE"}</p>
      </div>

      <div className="mt-4">
        <p className="font-mono text-xs tracking-widest text-mute">UNITS / SUBJECTS</p>
        {units.length === 0 ? (
          <p className="mt-2 font-mono text-xs text-mute">SUBJECT LIST NOT ON FILE</p>
        ) : (
          <ul className="mt-2 flex flex-wrap gap-1">
            {units.slice(0, open ? units.length : 4).map((unit) => (
              <li key={unit.code} className="border border-ink px-1.5 py-1 font-mono text-xs uppercase">
                {unit.code}
              </li>
            ))}
            {!open && units.length > 4 ? <li className="self-center font-mono text-xs text-mute">+{units.length - 4}</li> : null}
          </ul>
        )}
      </div>

      <div className="mt-4 border-t border-ink pt-3">
        {primary ? (
          <Link to="/circulars/$id" params={{ id: primary.id }} className="text-sm leading-snug hover:text-accent">
            {primary.title}
          </Link>
        ) : (
          <p className="font-mono text-xs text-mute">NO CIRCULAR ON FILE</p>
        )}
        <p className="mt-2 font-mono text-xs text-mute">
          {related.length === 0 ? "00 CIRCULARS" : `${String(related.length).padStart(2, "0")} CIRCULAR${related.length === 1 ? "" : "S"}`}
          {uni.website ? (
            <>
              {" · "}
              <ExternalLink href={uni.website}>{uni.website.replace(/^https?:\/\//, "")}</ExternalLink>
            </>
          ) : (
            " · SITE NOT LISTED"
          )}
        </p>
      </div>

      {open ? (
        <div className="mt-4 space-y-3 border-t border-ink pt-3 text-sm">
          {units.length ? (
            <ul className="space-y-2">
              {units.map((unit) => (
                <li key={`${unit.code}-detail`}>
                  <span className="font-display text-lg font-bold uppercase leading-none">{unit.code}</span>
                  <span className="mt-1 block">{unit.detail || "Detail not on file."}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <p>
            <span className="font-mono text-xs tracking-widest text-mute">ELIGIBILITY · </span>
            {primary && primary.eligibility.length ? primary.eligibility[0] : "NOT ON FILE"}
          </p>
          <p>
            <span className="font-mono text-xs tracking-widest text-mute">FEE · </span>
            {primary?.feeBdt == null ? "NOT ANNOUNCED" : `BDT ${primary.feeBdt.toLocaleString("en-BD")}`}
          </p>
          {primary?.pdfUrl ? (
            <p>
              <ExternalLink href={primary.pdfUrl}>Official PDF</ExternalLink>
            </p>
          ) : (
            <p className="font-mono text-xs text-mute">PDF NOT ON FILE</p>
          )}
          {uni.admissionUrl ? (
            <p>
              <ExternalLink href={uni.admissionUrl}>Application portal</ExternalLink>
            </p>
          ) : null}
          {uni.directoryNote ? <p className="text-pretty">{uni.directoryNote}</p> : null}
        </div>
      ) : null}

      <button
        type="button"
        className="mt-4 h-11 border border-ink px-3 text-left font-mono text-xs tracking-widest hover:bg-ink hover:text-paper"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "CLOSE DETAIL" : "OPEN DETAIL"}
      </button>
    </article>
  );
}
