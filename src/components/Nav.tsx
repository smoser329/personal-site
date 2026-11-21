"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Work" },
  { href: "#skills", label: "Stack" },
  { href: "#life", label: "Life" },
  { href: "#blog", label: "Writing" },
  { href: "#games", label: "Play" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <div
        className={`max-w-5xl mx-auto h-14 px-4 md:px-5 flex items-center justify-between rounded-full border transition-all duration-300 ${
          scrolled || open
            ? "bg-panel/80 backdrop-blur-xl border-line shadow-[0_8px_30px_rgb(0_0_0/0.4)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <Link href="#" className="flex items-center gap-2.5 group">
          <span className="w-7 h-7 rounded-full border border-line-2 grid place-items-center font-mono text-[11px] text-fg group-hover:border-amber transition-colors">
            SM
          </span>
          <span className="hidden sm:inline text-sm text-fg-2 group-hover:text-fg transition-colors">
            Samuel Moser
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-full text-sm text-mute hover:text-fg hover:bg-panel-2 transition-colors"
            >
              <span className="font-mono text-[10px] text-dim mr-1.5">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:smoser329@gmail.com"
          className="hidden md:inline-flex items-center gap-2 text-sm text-ink bg-fg hover:bg-amber px-4 py-1.5 rounded-full transition-colors font-medium"
        >
          Say hi
        </a>
        <button
          className="md:hidden text-fg-2 w-9 h-9 grid place-items-center rounded-full hover:bg-panel-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden max-w-5xl mx-auto mt-2 rounded-2xl bg-panel/95 backdrop-blur-xl border border-line p-2 flex flex-col">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-3 rounded-xl text-fg-2 hover:bg-panel-2 hover:text-fg flex items-center gap-3"
              onClick={() => setOpen(false)}
            >
              <span className="font-mono text-[11px] text-dim">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <a
            href="mailto:smoser329@gmail.com"
            className="m-2 mt-1 text-center text-sm text-ink bg-fg px-4 py-2.5 rounded-full font-medium"
          >
            Say hi
          </a>
        </div>
      )}
    </nav>
  );
}
