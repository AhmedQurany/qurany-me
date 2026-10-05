import {
  clients,
  contact,
  edge,
  education,
  experience,
  finalCta,
  hero,
  languages,
  problem,
  process,
  projects,
  skills,
  stats,
  udl,
  ventures,
} from "@/content/profile";
import { ProblemPile } from "./ProblemPile";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

const yearOf = (d: string) => d.split(" ").pop();

export function Hero() {
  return (
    <section id="top" className="page-x pb-20 pt-14 md:pb-28 md:pt-24">
      <p className="label flex items-center gap-3">
        <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-clay" aria-hidden />
        {hero.eyebrow}
      </p>

      <h1 className="mt-8 max-w-[15ch] text-display font-semibold md:mt-10">
        {hero.headline} <span className="text-clay">{hero.headlineAccent}</span>
      </h1>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="max-w-xl text-lead text-muted">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contact.cta} className="btn-primary">
              Let&apos;s talk <span aria-hidden>→</span>
            </a>
            <a href="#experience" className="btn-ghost">
              See the experience <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <div className="border-l-2 border-clay pl-5">
            <p className="label">Now</p>
            <p className="mt-2 text-lg leading-snug">{hero.now}</p>
          </div>
        </div>
      </div>

      <dl className="mt-16 grid border-t border-line sm:grid-cols-3 md:mt-24">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`border-b border-line py-6 sm:border-b-0 sm:py-8 ${
              i > 0 ? "sm:border-l sm:pl-8" : ""
            }`}
          >
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block text-[clamp(48px,6vw,84px)] font-semibold leading-none tracking-[-0.05em]">
                {s.value}
              </span>
              <span className="mt-3 block max-w-[24ch] text-sm text-muted">{s.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Problem() {
  return (
    <section className="page-x py-20 md:py-32">
      <SectionLabel index="01" title="The problem" />
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <h2 className="text-h2 font-semibold">{problem.headline}</h2>
        </Reveal>
        <Reveal delay={120} className="space-y-5 text-lead text-muted md:col-span-4 md:col-start-9 md:pt-3">
          {problem.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function StepGlyph({ i }: { i: number }) {
  const common = "h-12 w-12 stroke-clay";
  if (i === 0)
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" strokeWidth="2" aria-hidden>
        <path d="M4 16V4h12M32 4h12v12M44 32v12H32M16 44H4V32" />
      </svg>
    );
  if (i === 1)
    return (
      <svg viewBox="0 0 48 48" className={common} fill="none" strokeWidth="2" aria-hidden>
        <circle cx="15" cy="24" r="10" />
        <circle cx="33" cy="24" r="10" />
      </svg>
    );
  return (
    <svg viewBox="0 0 48 48" className={common} fill="none" strokeWidth="2" aria-hidden>
      <path d="M6 24h34M28 12l12 12-12 12" />
    </svg>
  );
}

export function Process() {
  return (
    <section id="process" className="page-x py-20 md:py-32">
      <SectionLabel index="02" title="The process" />
      <Reveal>
        <h2 className="max-w-[18ch] text-h2 font-semibold">{process.headline}</h2>
      </Reveal>
      <ol className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:mt-20 md:grid-cols-3">
        {process.steps.map((step, i) => (
          <Reveal as="li" key={step.name} delay={i * 120} className="flex flex-col bg-paper p-8 md:p-10">
            <div className="flex items-start justify-between">
              <StepGlyph i={i} />
              <span className="font-mono text-label text-muted">0{i + 1}</span>
            </div>
            <p className="mt-12 text-h3 font-semibold">{step.name}</p>
            <p className="label mt-2 !text-clay">{step.title}</p>
            <p className="mt-5 text-muted">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function Edge() {
  return (
    <section className="page-x py-20 md:py-32">
      <SectionLabel index="03" title="The edge" />
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <h2 className="text-h2 font-semibold">{edge.headline}</h2>
          <p className="mt-8 text-lead text-muted">{edge.body}</p>
          <p className="mt-8 border-l-2 border-clay pl-5 text-lg font-medium">{edge.kicker}</p>
        </Reveal>
        <div className="md:col-span-6 md:col-start-7">
          <ProblemPile problems={edge.problems} />
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="page-x py-20 md:py-32">
      <SectionLabel index="04" title="Experience" />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <h2 className="max-w-[16ch] text-h2 font-semibold">
            Eleven years, one thread: <span className="text-clay">making the parts connect.</span>
          </h2>
        </Reveal>
        <a href="/cv" className="btn-ghost">
          Full CV <span aria-hidden>↗</span>
        </a>
      </div>

      <ol className="mt-14 md:mt-20">
        {experience.map((r) => {
          const current = r.end === "Present";
          return (
            <Reveal
              as="li"
              key={r.company}
              className="grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <div className="md:col-span-2">
                <p className="font-mono text-sm text-muted">
                  {yearOf(r.start)} — {current ? "Now" : yearOf(r.end)}
                </p>
                {current && (
                  <span className="label mt-2 inline-block bg-clay-soft px-2 py-1 !text-clay">
                    Current
                  </span>
                )}
              </div>
              <div className="md:col-span-4">
                <h3 className="text-h3 font-semibold">{r.company}</h3>
                <p className="mt-1 font-medium text-clay">{r.role}</p>
                <p className="mt-2 text-sm text-muted">{r.context}</p>
              </div>
              <div className="md:col-span-6">
                <ul className="space-y-3 text-muted">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-[0.7em] h-px w-3 shrink-0 bg-clay" aria-hidden />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {r.engagements && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {r.engagements.map((e) => (
                      <li key={e} className="border border-line px-3 py-1 text-sm">
                        {e}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          );
        })}
      </ol>

      <div className="grid gap-px border border-line bg-line md:grid-cols-12">
        <div className="bg-paper p-8 md:col-span-7">
          <p className="label">Toolkit</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {skills.map((s) => (
              <li key={s} className="border border-line bg-sheet px-3 py-1.5 text-sm">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-paper p-8 md:col-span-3">
          <p className="label">Education</p>
          <p className="mt-5 font-medium">{education.school}</p>
          <p className="mt-1 text-sm text-muted">{education.degree}</p>
        </div>
        <div className="bg-paper p-8 md:col-span-2">
          <p className="label">Languages</p>
          <ul className="mt-5 space-y-2">
            {languages.map((l) => (
              <li key={l.name}>
                <span className="font-medium">{l.name}</span>
                <span className="block text-sm text-muted">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" className="page-x py-20 md:py-32">
      <SectionLabel index="05" title="Selected work" />
      <Reveal>
        <h2 className="max-w-[18ch] text-h2 font-semibold">Problems solved, not tasks done.</h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            as="article"
            key={p.client}
            delay={(i % 2) * 120}
            className="group flex flex-col border border-line bg-sheet p-8 transition-colors hover:border-clay md:p-10"
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-h3 font-semibold">{p.client}</h3>
              <span className="font-mono text-label text-muted">0{i + 1}</span>
            </div>
            <p className="label mt-10">Problem</p>
            <p className="mt-2 text-lg leading-snug">{p.problem}</p>
            <p className="label mt-6 !text-clay">Answer</p>
            <p className="mt-2 text-muted">{p.answer}</p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-8">
              {p.tags.map((t) => (
                <li key={t} className="label border border-line px-2 py-1">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="label">Products I build</p>
          <p className="mt-3 text-muted">
            The same system thinking, pointed at my own products — designed, built, and shipped
            without a handoff.
          </p>
        </div>
        <ul className="grid gap-8 sm:grid-cols-2 md:col-span-7 md:col-start-6">
          {ventures.map((v) => (
            <li key={v.name}>
              <p className="text-h3 font-semibold">{v.name}</p>
              <p className="label mt-1 !text-clay">{v.role}</p>
              <p className="mt-3 text-muted">{v.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Udl() {
  return (
    <section className="bg-ink text-paper">
      <div className="page-x grid gap-12 py-20 md:grid-cols-12 md:py-32">
        <div className="md:col-span-7">
          <p className="label !text-paper/60">06 — Ultimate Designers Lab</p>
          <Reveal>
            <h2 className="mt-8 text-h2 font-semibold">{udl.headline}</h2>
          </Reveal>
          <div className="mt-8 space-y-5 text-lead text-paper/70">
            {udl.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <a
            href={udl.href}
            target="_blank"
            rel="noreferrer"
            className="btn mt-10 border border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink"
          >
            Learn about UDL <span aria-hidden>↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
        <dl className="grid content-end gap-px self-end bg-paper/15 md:col-span-4 md:col-start-9">
          {udl.facts.map((f) => (
            <div key={f.label} className="bg-ink py-6">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block text-[clamp(48px,5vw,72px)] font-semibold leading-none tracking-[-0.05em] text-clay">
                  {f.value}
                </span>
                <span className="label mt-3 block !text-paper/60">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Clients() {
  return (
    <section className="page-x py-20 md:py-24">
      <p className="label">Trusted across 11+ years and multiple industries</p>
      <ul className="mt-8 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
        {clients.map((c) => (
          <li
            key={c}
            className="flex h-24 items-center justify-center border-b border-r border-line px-4 text-center text-lg font-semibold tracking-tight text-muted transition-colors hover:text-ink md:h-28 md:text-xl"
          >
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="page-x py-24 md:py-40">
      <Reveal>
        <h2 className="max-w-[20ch] text-display font-semibold">
          {finalCta.headline} <span className="text-clay">{finalCta.accent}</span>
        </h2>
      </Reveal>
      <div className="mt-12 flex flex-wrap items-center gap-6">
        <a href={contact.cta} className="btn-primary">
          Let&apos;s talk <span aria-hidden>→</span>
        </a>
        <a href={`mailto:${contact.email}`} className="text-lg underline decoration-line underline-offset-8 hover:decoration-clay">
          {contact.email}
        </a>
      </div>
    </section>
  );
}
