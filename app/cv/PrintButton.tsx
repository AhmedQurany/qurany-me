"use client";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="rounded-pill bg-red px-6 py-3 text-base text-white transition-colors hover:bg-maroon">
      Print / Save PDF
    </button>
  );
}
