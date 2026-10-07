import Image from "next/image";
import {
  clients,
  contact,
  edge,
  experience,
  finalCta,
  hero,
  problem,
  process,
  socials,
  udl,
  work,
} from "@/content/profile";
import { findPublic, hasPublic } from "@/lib/assets";
import { EdgePile } from "./EdgePile";
import { Reveal } from "./Reveal";

const yearOf = (d: string) => d.split(" ").pop();

/* ── Hero ─────────────────────────────────────────────────────────────── */

export function Hero() {
  const video = hasPublic("/videos/hero.mp4") ? "/videos/hero.mp4" : null;
  return (
    <section id="top" className="relative isolate h-[min(100svh,1080px)] min-h-[640px] overflow-hidden bg-maroon">
      {video ? (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          src={video}
          poster="/images/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      ) : (
        <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      )}
      {/* Horizon shadow and the fade into the maroon section, both from Figma. */}
      <div aria-hidden className="absolute left-1/2 top-[80.6%] h-[11px] w-[42%] -translate-x-1/2 bg-black blur-[11.7px]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[23%] bg-gradient-to-b from-maroon/0 to-maroon" />

      <div className="page-x pt-[clamp(110px,18.3vh,198px)]">
        <h1 className="max-w-[900px] text-hero font-medium text-white">{hero.headline}</h1>
        <p className="mt-11 max-w-[560px] text-lead leading-[1.25] text-grey-200">{hero.body}</p>
        <div className="mt-11 flex flex-wrap items-center gap-6">
          <a href={contact.cta} className="glass">
            Let&apos;s talk
          </a>
          <a href="#work" className="text-lead leading-none text-grey-200 underline-offset-8 hover:underline">
            See the work
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Problem (+ the glow that hands over to the process) ─────────────── */

export function Problem() {
  return (
    <section className="relative isolate overflow-hidden bg-maroon pb-[clamp(80px,14vw,260px)] pt-[clamp(96px,11.8vw,227px)]">
      <Reveal className="page-x">
        <div className="flex max-w-[651px] flex-col gap-8">
          <p className="label">{problem.label}</p>
          <h2 className="text-h2 font-medium text-white">{problem.headline}</h2>
          <p className="text-lead text-grey-500">{problem.body}</p>
          <p className="text-lead text-grey-100">{problem.close}</p>
        </div>
      </Reveal>

      {/* White ellipse rising out of the maroon (Figma "Ellipse 1"). */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -z-10 h-[clamp(720px,48vw,918px)] w-[138%] -translate-x-1/2 translate-y-1/2 rounded-[50%] bg-white blur-[clamp(60px,8vw,166px)]"
      />
      <div id="process" className="page-x relative mt-[clamp(220px,30vw,560px)] scroll-mt-24 text-center">
        <p className="label">{process.label}</p>
        <h2 className="mx-auto mt-8 max-w-[552px] text-h2 font-medium text-maroon">{process.headline}</h2>
      </div>
    </section>
  );
}

/* ── Process panels (Frame / Connect / Ship) ──────────────────────────── */

const LIQUID = [
  ["#BF4447", "#F3B8C0", "#3A1015"],
  ["#3A1015", "#BF4447", "#F7D7DA"],
  ["#F3B8C0", "#3A1015", "#BF4447"],
];

function ProcessPanel({ index, children }: { index: number; children: React.ReactNode }) {
  const step = process.steps[index];
  const video = hasPublic(step.video) ? step.video : null;
  return (
    <section className="relative isolate flex h-[min(100svh,1080px)] min-h-[620px] items-center overflow-x-clip">
      {video ? (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          src={video}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      ) : (
        <div aria-hidden className="absolute inset-0 -z-10">
          {LIQUID[index].map((c, i) => (
            <span
              key={c}
              className="liquid"
              style={{
                background: c,
                // Keep the centre (where the step text sits) mostly clear.
                left: `${[[24, 78, 52], [76, 22, 60], [70, 30, 88]][index][i]}%`,
                top: `${[[70, 34, 92], [30, 72, 8], [78, 22, 58]][index][i]}%`,
                width: `min(${[62, 46, 36][i]}vw, ${[720, 520, 420][i]}px)`,
                animationDelay: `${i * -7}s`,
                animationDuration: `${22 + i * 6}s`,
                opacity: [0.16, 0.2, 0.24][i],
              }}
            />
          ))}
        </div>
      )}
      {children}
    </section>
  );
}

function StepText({ index, align = "center" }: { index: number; align?: "center" | "start" }) {
  const step = process.steps[index];
  return (
    <div className={`flex w-[241px] max-w-full flex-col gap-4 ${align === "center" ? "items-center text-center" : ""}`}>
      <h3 className="text-h2 font-medium text-maroon">{step.name}</h3>
      <p className="text-base leading-[1.3] text-grey-500">{step.body}</p>
    </div>
  );
}

export function ProcessPanels() {
  return (
    <>
      <ProcessPanel index={0}>
        <Reveal className="page-x flex justify-center">
          <StepText index={0} />
        </Reveal>
      </ProcessPanel>
      <ProcessPanel index={1}>
        <Reveal className="page-x flex justify-center">
          <StepText index={1} />
        </Reveal>
      </ProcessPanel>
      <ProcessPanel index={2}>
        <Reveal className="page-x flex flex-wrap items-end justify-between gap-12 xl:px-[154px]">
          <StepText index={2} align="start" />
          <div className="flex w-[241px] flex-col items-start gap-4">
            <p className="text-2xl font-medium text-maroon">See how I work?</p>
            <a href="#experience" className="pill-outline">
              The process
            </a>
          </div>
        </Reveal>
      </ProcessPanel>
    </>
  );
}

/* ── Edge ─────────────────────────────────────────────────────────────── */

export function Edge() {
  return (
    <section
      id="edge"
      className="relative overflow-hidden bg-maroon pb-14 pt-[clamp(96px,12.2vw,235px)] lg:min-h-[max(720px,55vw)] lg:pb-0"
    >
      <Reveal className="page-x">
        <div className="mx-auto flex max-w-[961px] flex-col items-center gap-8 text-center">
          <p className="label">{edge.label}</p>
          <h2 className="text-h2 font-medium text-white">{edge.headline}</h2>
          <p className="text-lead text-grey-500">{edge.body}</p>
          <p className="text-kicker text-grey-100">
            {edge.kicker[0]}
            <span className="text-red">{edge.kicker[1]}</span>
            {edge.kicker[2]}
          </p>
        </div>
      </Reveal>
      <div className="mt-14 lg:mt-0">
        <EdgePile problems={edge.problems} />
      </div>
    </section>
  );
}

/* ── Selected work ────────────────────────────────────────────────────── */

function WorkCard({ i, tall = false, wide = false }: { i: number; tall?: boolean; wide?: boolean }) {
  const p = work.projects[i];
  const total = work.projects.length;
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card ${
        tall ? (wide ? "aspect-[837/704]" : "aspect-[410/704]") : "aspect-[410/345]"
      }`}
    >
      <Image
        src={p.image}
        alt={`${p.name} — ${p.summary}`}
        fill
        sizes={wide ? "(min-width: 1024px) 840px, 100vw" : "(min-width: 1024px) 420px, 100vw"}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 translate-y-[6%] opacity-0 transition-[opacity,transform] duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <Image src={p.hover} alt="" fill sizes={wide ? "840px" : "420px"} className="object-cover" />
      </div>
      <span aria-hidden className="shine" />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent from-40% to-[rgba(4,4,4,0.88)] p-7">
        <h3 className="font-syne text-[30px] font-bold leading-[48px] tracking-[-0.9px] text-white/75 transition-colors group-hover:text-white">
          {p.name}
        </h3>
        <p className="font-syne text-sm text-white/55">{p.summary}</p>
      </div>
      <p className="absolute right-5 top-5 font-syne text-[11px] font-medium tracking-[0.66px] text-white/35">
        #{String(i + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </p>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 bg-white py-[clamp(96px,12vw,176px)]">
      <div className="page-x">
        <Reveal className="flex flex-col gap-4">
          <p className="label">{work.label}</p>
          <h2 className="text-h2 font-medium text-grey-900">{work.headline}</h2>
        </Reveal>
        <div className="mt-[50px] grid gap-4 md:grid-cols-[410.8fr_837.4fr]">
          <WorkCard i={0} tall />
          <WorkCard i={1} tall wide />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <WorkCard i={2} />
          <WorkCard i={3} />
          <WorkCard i={4} />
        </div>
      </div>
    </section>
  );
}

/* ── Beyond the work (UDL) ────────────────────────────────────────────── */

export function Udl() {
  return (
    <section className="bg-maroon py-[clamp(80px,5.8vw,112px)]">
      <Reveal className="page-x">
        <div className="flex max-w-[651px] flex-col items-start gap-11 pb-[clamp(40px,8vw,160px)]">
          <p className="label">{udl.label}</p>
          <h2 className="max-w-[458px] text-h2 font-medium text-grey-100">{udl.headline}</h2>
          <div className="space-y-5 text-base leading-[1.3] text-grey-400">
            {udl.body.map((b) => (
              <p key={b}>{b}</p>
            ))}
          </div>
          <a href={udl.href} target="_blank" rel="noreferrer" className="glass">
            {udl.cta} <span aria-hidden>→</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Clients ──────────────────────────────────────────────────────────── */

export function Clients() {
  return (
    <section aria-label="Clients" className="bg-white py-[clamp(80px,12vw,229px)]">
      <ul className="page-x grid grid-cols-2 items-center gap-x-16 gap-y-14 sm:grid-cols-3 lg:grid-cols-6">
        {clients.map((c) => {
          const logo = findPublic(`/logos/${c.slug}`, ["svg", "png", "webp"]);
          return (
            <li key={c.slug} className="flex h-20 items-center">
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt={c.name} className="max-h-[74px] w-auto max-w-full object-contain" />
              ) : (
                <span className="text-2xl font-medium tracking-tight text-grey-500">{c.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ── Experience ───────────────────────────────────────────────────────── */

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 bg-white pb-[clamp(96px,10vw,176px)]">
      <div className="page-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <p className="label">Experience</p>
            <h2 className="text-h2 font-medium text-grey-900">Eleven years, one thread.</h2>
          </div>
          <a href="/cv" className="pill-outline">
            Full CV
          </a>
        </Reveal>
        <ol className="mt-[50px]">
          {experience.map((r) => {
            const current = r.end === "Present";
            return (
              <Reveal
                as="li"
                key={r.company}
                className="grid gap-4 border-t border-grey-200 py-9 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-2">
                  <p className="text-base tabular-nums text-grey-500">
                    {yearOf(r.start)} — {current ? "Now" : yearOf(r.end)}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-medium text-grey-900">{r.company}</h3>
                  <p className="mt-1 text-lead text-red">{r.role}</p>
                  <p className="mt-2 text-sm text-grey-500">{r.context}</p>
                </div>
                <ul className="space-y-2 text-base leading-[1.45] text-grey-600 md:col-span-6">
                  {r.points.map((p) => (
                    <li key={p}>
                      {p}
                      {r.engagements && p.endsWith(":") && ` ${r.engagements.join(", ")}.`}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ── Final CTA + footer ───────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="bg-maroon text-white">
      <div className="page-x py-[clamp(96px,10vw,176px)]">
        <Reveal>
          <h2 className="max-w-[900px] text-hero font-medium">
            {finalCta.headline} <span className="text-red">{finalCta.accent}</span>
          </h2>
        </Reveal>
        <div className="mt-11 flex flex-wrap items-center gap-6">
          <a href={contact.cta} className="glass">
            Let&apos;s talk
          </a>
          <span className="select-all text-lead text-grey-400">{contact.email}</span>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-6 text-base text-grey-400 md:px-8">
          <span className="text-white">Qurany</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <span>
            © {new Date().getFullYear()} Ahmed Qurany · {contact.location}
          </span>
        </div>
      </div>
    </footer>
  );
}
