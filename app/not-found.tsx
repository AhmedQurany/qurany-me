export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-8 bg-maroon px-5 text-white md:px-8 xl:px-[328px]">
      <p className="label">404</p>
      <h1 className="max-w-[900px] text-hero font-medium">
        This page isn&apos;t part of the system. <span className="text-red">Yet.</span>
      </h1>
      <a href="/" className="glass">
        Back home
      </a>
    </main>
  );
}
