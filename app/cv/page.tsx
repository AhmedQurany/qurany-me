import type { Metadata } from "next";
import {
  contact,
  education,
  experience,
  languages,
  skills,
  socials,
  ventures,
} from "@/content/profile";
import { Mark } from "@/components/ui";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "CV",
  description: "Ahmed Qurany — Creative Experience Architect. Experience, ventures, skills, and education.",
};

const summary =
  "Creative Experience Architect working where design, code, and product strategy meet — turning ideas into systems, and systems into products that scale. 11+ years and 500+ projects across brand identity, design systems, and shipping SaaS as a hybrid designer–developer–founder.";

export default function CvPage() {
  return (
    <main className="mx-auto max-w-[860px] px-5 py-10 md:py-16 print:max-w-none print:p-0">
      <div className="mb-10 flex items-center justify-between print:hidden">
        <a href="/" className="label hover:text-clay">
          ← qurany.me
        </a>
        <PrintButton />
      </div>

      <article className="border border-line bg-sheet p-8 md:p-12 print:border-0 print:p-0">
        <header className="grid gap-6 border-b-2 border-ink pb-8 sm:grid-cols-[1fr_auto]">
          <div>
            <h1 className="text-[44px] font-semibold leading-none tracking-[-0.04em]">
              Ahmed Qurany
            </h1>
            <p className="mt-3 text-lg font-medium text-clay">Creative Experience Architect</p>
          </div>
          <div className="space-y-1 text-sm text-muted sm:text-right">
            <p>{contact.location}</p>
            <p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p>qurany.me</p>
            {socials.slice(0, 2).map((s) => (
              <p key={s.label}>{s.href.replace(/^https:\/\/(www\.)?/, "")}</p>
            ))}
          </div>
        </header>

        <p className="mt-8 leading-relaxed">{summary}</p>

        <CvSection title="Experience">
          <ol className="space-y-7">
            {experience.map((r) => (
              <li key={r.company} className="grid gap-2 break-inside-avoid sm:grid-cols-[150px_1fr] sm:gap-6">
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  {r.start} —<br className="hidden sm:inline" /> {r.end}
                </p>
                <div>
                  <p className="font-semibold">
                    {r.role} <span className="font-normal text-muted">· {r.company}</span>
                  </p>
                  <p className="text-sm text-muted">{r.context}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm marker:text-clay">
                    {r.points.map((p) => (
                      <li key={p}>
                        {p}
                        {r.engagements && p.endsWith(":") && ` ${r.engagements.join(", ")}.`}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </CvSection>

        <CvSection title="Ventures">
          <ul className="space-y-4">
            <li className="break-inside-avoid">
              <p className="font-semibold">
                Ultimate Designers Lab (UDL) <span className="font-normal text-muted">· Founder</span>
              </p>
              <p className="text-sm">
                A community for designers who refuse to be replaced by AI. Built the full platform —
                25 spaces, 800+ curated resources — the sales motion, and the content engine.
              </p>
            </li>
            {ventures.map((v) => (
              <li key={v.name} className="break-inside-avoid">
                <p className="font-semibold">
                  {v.name} <span className="font-normal text-muted">· {v.role}</span>
                </p>
                <p className="text-sm">{v.body}</p>
              </li>
            ))}
          </ul>
        </CvSection>

        <div className="grid gap-x-10 sm:grid-cols-[1.4fr_1fr]">
          <CvSection title="Skills">
            <p className="text-sm leading-relaxed">{skills.join(" · ")}</p>
          </CvSection>
          <div>
            <CvSection title="Education">
              <p className="font-semibold">{education.school}</p>
              <p className="text-sm text-muted">{education.degree}</p>
            </CvSection>
            <CvSection title="Languages">
              <ul className="text-sm">
                {languages.map((l) => (
                  <li key={l.name}>
                    <span className="font-medium">{l.name}</span> — {l.level}
                  </li>
                ))}
              </ul>
            </CvSection>
          </div>
        </div>

        <footer className="mt-12 flex items-center justify-between border-t border-line pt-4">
          <Mark className="text-xl" />
          <span className="label">Strategy · Interface · Build</span>
        </footer>
      </article>
    </main>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="label mb-4 border-b border-line pb-2 !text-clay">{title}</h2>
      {children}
    </section>
  );
}
