import Image from "next/image";
import SectionHeader from "./SectionHeader";

const specs = [
  { k: "Degree", v: "B.S. Mechanical Engineering, Aerospace" },
  { k: "School", v: "Rutgers School of Engineering, 2021" },
  { k: "GPA", v: "3.64 · Dean's List · Kappa Sigma" },
  { k: "Certs", v: "DevSecOps Engineer (DOL) · Kubernetes CNA · Scrum PO" },
];

export default function About() {
  return (
    <section id="about" className="py-28 border-t border-line">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          index="01"
          label="About"
          title={
            <>
              Engineer by training,
              <br />
              <span className="text-mute">builder by nature.</span>
            </>
          }
        />

        <div className="grid md:grid-cols-[1fr_1.05fr] gap-12 md:gap-16 items-start">
          <div className="space-y-5 text-fg-2 leading-relaxed text-[17px]">
            <p>
              I studied Mechanical Engineering with an Aerospace concentration at Rutgers. The
              systems thinking and analytical rigor I built there shape how I approach software
              every day.
            </p>
            <p>
              A 2019 summer internship turned into a career defined by curiosity: using AI to
              improve Ballistic Missile Defense classifiers, co-creating LM&apos;s{" "}
              <span className="text-fg">Sensor Data Fusion Test Bed</span>, and now leading a suite
              of six enterprise web apps as the{" "}
              <span className="text-fg">Lean Agile Center of Excellence Lead Developer</span>.
            </p>
            <p>
              Outside of shipping software, I mentor 10+ interns each year and advocate for Agile
              principles across a 3,000+ person program.
            </p>
          </div>

          <div>
            {/* Shown at the photo's native 3:2 so it is never cropped or upscaled */}
            <figure className="group">
              <div className="relative aspect-[3/2] rounded-3xl overflow-hidden border border-line bg-panel">
                <Image
                  src="/samuel-ac130.jpg"
                  alt="Samuel Moser in front of a C-130J at Lockheed Martin Marietta"
                  fill
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
                  quality={90}
                  className="photo object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] text-dim">
                <span className="text-amber">C-130J</span> Super Hercules facility · Marietta, GA
              </figcaption>
            </figure>

            <dl className="mt-8 border-t border-line divide-y divide-line">
              {specs.map((s) => (
                <div key={s.k} className="grid grid-cols-[84px_1fr] gap-4 py-3 text-sm">
                  <dt className="font-mono text-xs uppercase tracking-wider text-dim pt-0.5">{s.k}</dt>
                  <dd className="text-fg-2">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
