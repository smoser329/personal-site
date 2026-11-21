import Image from "next/image";

const stats = [
  { value: "6+", label: "Years at Lockheed Martin" },
  { value: "6", label: "Enterprise apps I lead" },
  { value: "3,000+", label: "People those apps serve" },
  { value: "10+", label: "Interns mentored a year" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* grid + glow */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_70%_30%,black_20%,transparent_70%)]" />
      <div className="absolute -top-40 right-[-10%] w-[680px] h-[680px] rounded-full bg-amber/10 blur-[140px]" />

      <div className="relative max-w-5xl mx-auto px-6 pt-36 md:pt-44 pb-20">
        <div className="flex items-center gap-3 font-mono text-xs text-mute mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-amber blink" />
          <span className="uppercase tracking-[0.2em]">Miami, FL</span>
          <span className="text-dim hidden sm:inline">25.76°N 80.19°W</span>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-end">
          <div>
            <h1 className="font-display font-semibold tracking-[-0.035em] text-fg leading-[0.92] text-[clamp(3.5rem,11vw,8.5rem)]">
              Samuel
              <br />
              <span className="text-mute">Moser</span>
              <span className="text-amber">.</span>
            </h1>
            <p className="mt-10 text-lg md:text-xl text-fg-2 leading-relaxed max-w-xl">
              Software Engineer IV at Lockheed Martin. I build AI-powered web apps for agile
              teams, lead DevSecOps transformation, and mentor the next generation of engineers.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#experience"
                className="group inline-flex items-center gap-2 px-5 py-3 bg-amber text-ink text-sm font-semibold rounded-full hover:bg-fg transition-colors"
              >
                See my work
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#blog"
                className="px-5 py-3 border border-line-2 text-fg text-sm font-medium rounded-full hover:border-fg-2 hover:bg-panel transition-colors"
              >
                Read the blog
              </a>
              <a
                href="https://www.linkedin.com/in/samuel-moser-4737aa12b/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-mute text-sm font-medium rounded-full hover:text-fg transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <figure className="group relative w-full max-w-[300px] md:w-[280px] justify-self-start md:justify-self-end">
            <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-line bg-panel">
              <Image
                src="/samuel.jpg"
                alt="Samuel Moser"
                fill
                sizes="(min-width: 768px) 280px, 300px"
                className="photo object-cover"
                style={{ objectPosition: "center 5%" }}
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-fg-2">
                <span>Lean Agile CoE</span>
                <span className="text-amber">Lead Dev</span>
              </figcaption>
            </div>
          </figure>
        </div>

        <dl className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink p-5 md:p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl md:text-4xl font-semibold text-fg tracking-tight">
                {s.value}
              </dd>
              <p className="mt-1 text-xs md:text-sm text-mute">{s.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
