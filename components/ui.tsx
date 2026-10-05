import { contact, socials } from "@/content/profile";

const nav = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "/cv", label: "CV" },
];

export function Mark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-semibold tracking-[-0.04em] ${className}`}>
      AQ<span className="text-clay">.</span>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="page-x flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3" aria-label="Ahmed Qurany — home">
          <Mark className="text-xl" />
          <span className="hidden text-sm font-medium sm:inline">Ahmed Qurany</span>
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="label transition-colors hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={contact.cta} className="btn-primary !px-4 !py-2.5">
          Let&apos;s talk <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 border-t border-ink pt-4 md:mb-16">
      <span className="font-mono text-label text-clay">{index}</span>
      <span className="label">{title}</span>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="page-x grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Mark className="text-5xl md:text-7xl" />
          <p className="mt-4 max-w-sm text-muted">
            Creative Experience Architect. Strategy, interface, and build — as one system.
          </p>
        </div>
        <div className="flex flex-col gap-6 md:items-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href={`mailto:${contact.email}`} className="label hover:text-clay">
                Email
              </a>
            </li>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="label hover:text-clay">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="label">© {new Date().getFullYear()} Ahmed Qurany · {contact.location}</p>
        </div>
      </div>
    </footer>
  );
}
