import Image from "next/image";
import SectionHeader from "./SectionHeader";

const roles = [
  {
    title: "Software Engineer IV — Lean Agile CoE Lead Developer",
    company: "Lockheed Martin",
    period: "Nov 2024 – Present",
    location: "Remote",
    current: true,
    description:
      "Lead Developer and Systems Architect for a suite of 6 enterprise Agile web applications serving a 3,000+ person program. Apps span roster visualization (Teams Map, 30–100 daily users), Tableau metrics dashboards (100–1,000 daily users), training portals, an Agile OS guide, a Value Stream Mapping tool, and a survey platform that reached 600+ employees.",
    tags: ["Next.js", "React", "TypeScript", ".NET", "DevSecOps", "GitOps"],
  },
  {
    title: "Software Engineer — Part-time",
    company: "Tradepost (formerly Backstage Technologies)",
    period: "Jan 2025 – Apr 2025",
    location: "Remote",
    side: true,
    description:
      "Balanced alongside Lockheed Martin. Built a Python FastAPI + React + GraphQL component for comparable ticket pricing, cutting offer generation time by ~20%. Designed 5+ metric-tracking tables in PostgreSQL visualized in Metabase, and consulted on a ticket grouping algorithm ensemble to increase platform match completeness.",
    tags: ["Python", "FastAPI", "React", "GraphQL", "PostgreSQL", "Metabase"],
  },
  {
    title: "Software Engineer II — Lean Agile CoE Stretch Assignment",
    company: "Lockheed Martin",
    period: "May 2022 – Nov 2024",
    location: "Moorestown, NJ",
    description:
      "Lead Dev/Sys Architect and Intern Coach building Agile Tools for LM's 1LMX Digital Transformation. Completed the DevSecOps Technical Accelerator Program (1,000 hrs OJT). Co-created the LM Sensor Data Fusion Test Bed — a scoring system for 15+ fusion algorithm metrics integrated into a software regression pipeline that reduced defect rate by 20%. Also worked on synthetic kinematic data generation to train anomaly detection ML models for commercial aircraft.",
    tags: ["React", "Python", "AWS", "Kubernetes", "Docker", "CI/CD"],
  },
  {
    title: "Combat Systems Engineer",
    company: "Lockheed Martin",
    period: "Jul 2021 – May 2022",
    location: "Moorestown, NJ",
    description:
      "BMD 5.1.4 MDT CND Point of Contact. Supported Requirements Verification for 100+ live test events for AEGIS Combat Systems. Developed ETL software in Python and MATLAB to scorecard tests and visualize data.",
    tags: ["Python", "MATLAB", "ClearQuest", "Rational DOORS"],
  },
  {
    title: "Combat Systems Engineering Co-op",
    company: "Lockheed Martin",
    period: "Jun 2020 – Jul 2021",
    location: "Moorestown, NJ",
    description:
      "Created the Swath Tool — a data analysis GUI that extracted compressed log files and parsed events of significance for AEGIS combat systems. Resolved 20+ bug reports that were blocked due to insufficient detail.",
    tags: ["Python", "Regression Testing", "AEGIS"],
  },
  {
    title: "Combat Systems Engineering Intern",
    company: "Lockheed Martin",
    period: "May 2019 – Aug 2019",
    location: "Moorestown, NJ",
    description:
      "Worked alongside an LM Fellow using Artificial Intelligence to enhance Ballistic Missile Defense classifier algorithms on the AEGIS BL10 CND program.",
    tags: ["Machine Learning", "Python", "AEGIS"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 bg-ink-2 border-y border-line">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          index="02"
          label="Work"
          title={<>Where I&apos;ve worked</>}
          intro="6+ years at Lockheed Martin across test engineering, data science, and full-stack software development."
        />

        <ol className="border-t border-line">
          {roles.map((role) => (
            <li
              key={role.title}
              className="group grid md:grid-cols-[200px_1fr] gap-3 md:gap-10 py-9 border-b border-line"
            >
              <div className="font-mono text-xs text-mute md:pt-1.5 flex md:flex-col gap-x-3 gap-y-1 flex-wrap">
                <span className={`flex items-center gap-2 ${role.current ? "text-amber" : ""}`}>
                  {role.current && <span className="w-1.5 h-1.5 rounded-full bg-amber blink" />}
                  {role.period}
                </span>
                <span className="text-dim">{role.location}</span>
              </div>
              <div>
                <p
                  className={`text-sm font-medium mb-1 ${
                    role.side ? "text-lilac" : "text-fg-2"
                  }`}
                >
                  {role.company}
                  {role.side && (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-dim">
                      side role
                    </span>
                  )}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight text-fg leading-snug">
                  {role.title}
                </h3>
                <p className="mt-4 text-fg-2 leading-relaxed text-[15px] max-w-2xl">{role.description}</p>
                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-xs text-mute">
                  {role.tags.map((t) => (
                    <li key={t} className="before:content-['/'] before:mr-1.5 before:text-dim">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <figure className="group mt-16">
          <div className="relative h-60 md:h-96 rounded-3xl overflow-hidden border border-line bg-panel">
            <Image
              src="/team-ac130.jpg"
              alt="Samuel Moser and his intern team at the C-130J Super Hercules factory, Lockheed Martin Marietta, Georgia"
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className="photo object-cover object-center group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
            <figcaption className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-2">
              <span className="font-display text-lg md:text-2xl font-semibold text-fg">
                The intern team
              </span>
              <span className="font-mono text-[11px] text-fg-2">
                C-130J Super Hercules facility · Marietta, GA
              </span>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
