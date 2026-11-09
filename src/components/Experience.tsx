import Image from "next/image";

const roles = [
  {
    title: "Software Engineer IV — Lean Agile CoE Lead Developer",
    company: "Lockheed Martin",
    period: "Nov 2024 – Present",
    location: "Remote",
    description:
      "Lead Developer and Systems Architect for a suite of 6 enterprise Agile web applications serving a 3,000+ person program. Apps span roster visualization (Teams Map, 30–100 daily users), Tableau metrics dashboards (100–1,000 daily users), training portals, an Agile OS guide, a Value Stream Mapping tool, and a survey platform that reached 600+ employees.",
    tags: ["Next.js", "React", "TypeScript", ".NET", "DevSecOps", "GitOps"],
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
    title: "Software Engineer — Part-time",
    company: "Tradepost (formerly Backstage Technologies)",
    period: "Jan 2025 – Apr 2025",
    location: "Remote",
    description:
      "Balanced alongside Lockheed Martin. Built a Python FastAPI + React + GraphQL component for comparable ticket pricing, cutting offer generation time by ~20%. Designed 5+ metric-tracking tables in PostgreSQL visualized in Metabase, and consulted on a ticket grouping algorithm ensemble to increase platform match completeness.",
    tags: ["Python", "FastAPI", "React", "GraphQL", "PostgreSQL", "Metabase"],
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
    <section id="experience" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sky-500 font-medium text-sm tracking-widest uppercase mb-3">Experience</p>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Where I&apos;ve worked</h2>
        <p className="text-stone-500 text-sm mb-10 max-w-xl">
          6+ years at Lockheed Martin across test engineering, data science, and full-stack software development.
        </p>

        {/* Team photo */}
        <div className="mb-10 rounded-xl overflow-hidden shadow-md">
          <div className="relative w-full h-56 md:h-72">
            <Image
              src="/team-ac130.jpg"
              alt="Samuel Moser and his intern team at the C-130J Super Hercules factory, Lockheed Martin Marietta, Georgia"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="p-3 bg-stone-50 border-t border-stone-100">
            <p className="text-xs text-stone-400 text-center">With the intern team at the C-130J Super Hercules facility, Marietta, GA</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-stone-200 ml-5 hidden md:block" />
          <div className="space-y-8">
            {roles.map((role, i) => (
              <div key={i} className="md:pl-16 relative">
                <div className="hidden md:flex absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-stone-200 items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-sky-400" />
                </div>
                <div className={`p-6 rounded-xl border bg-white hover:shadow-sm transition-all ${role.company === "Tradepost (formerly Backstage Technologies)" ? "border-purple-100" : "border-stone-100 hover:border-stone-200"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-stone-900">{role.title}</h3>
                      <p className={`text-sm font-medium ${role.company.includes("Tradepost") ? "text-purple-500" : "text-sky-600"}`}>{role.company}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-stone-500 text-sm">{role.period}</p>
                      <p className="text-stone-400 text-xs">{role.location}</p>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed mb-3">{role.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {role.tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
