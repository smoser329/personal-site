const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/samuel-moser-4737aa12b/", external: true },
  { label: "GitHub", href: "https://github.com/smoser329", external: true },
  { label: "Email", href: "mailto:smoser329@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-amber/10 blur-[140px]" />
      <div className="relative max-w-5xl mx-auto px-6 pt-28 pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-mute mb-6">Get in touch</p>
        <a
          href="mailto:smoser329@gmail.com"
          className="group inline-block font-display font-semibold tracking-[-0.03em] text-fg leading-[0.95] text-[clamp(2.5rem,8vw,6rem)]"
        >
          Let&apos;s build
          <br />
          <span className="text-mute group-hover:text-amber transition-colors">something.</span>
        </a>

        <div className="mt-20 pt-6 border-t border-line flex flex-col-reverse md:flex-row md:items-center justify-between gap-6">
          <p className="font-mono text-xs text-dim">© 2026 Samuel Moser · Miami, FL</p>
          <div className="flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-sm text-mute hover:text-fg transition-colors"
              >
                {l.label}
                {l.external && <span className="text-dim ml-0.5">↗</span>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
