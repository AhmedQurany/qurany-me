import { Mark } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="page-x flex min-h-screen flex-col items-start justify-center gap-8">
      <Mark className="text-3xl" />
      <h1 className="text-h2 font-semibold">
        This page isn&apos;t part of the system. <span className="text-clay">Yet.</span>
      </h1>
      <a href="/" className="btn-primary">
        Back home <span aria-hidden>→</span>
      </a>
    </main>
  );
}
