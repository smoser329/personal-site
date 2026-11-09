const roles = [
  {
    title: "Staff Software Engineer — Lead Developer & Product Owner",
    company: "Lockheed Martin",
    period: "2023 – Present",
    location: "Remote",
    description:
      "Product Owner and Lead Developer for Teams Map — an enterprise platform that virtualizes roster management for programs with hundreds of teams. Features include real-time verification reminders, JIRA integration, Active Directory tooling, and reporting dashboards. Lead a team of 5–10 software engineering interns.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind"],
  },
  {
    title: "Software Engineer",
    company: "Lockheed Martin",
    period: "2021 – 2023",
    location: "Moorestown, NJ",
    description:
      "Transitioned from hardware to software, building internal web applications to improve developer and program agility. Drove adoption of modern web practices across engineering teams.",
    tags: ["React", ".NET", "C#", "JavaScript"],
  },
  {
    title: "Test Engineer — AEGIS Combat System",
    company: "Lockheed Martin",
    period: "2019 – 2021",
    location: "Moorestown, NJ",
    description:
      "Compared Digital Twin simulation data against live test data to validate the AEGIS naval weapons system. Started as an intern and joined full-time after graduation.",
    tags: ["Digital Twins", "Data Analysis", "Python"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sky-500 font-medium text-sm tracking-widest uppercase mb-3">Experience</p>
        <h2 className="text-3xl font-bold text-stone-900 mb-12">Where I&apos;ve worked</h2>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-stone-200 ml-5 hidden md:block" />
          <div className="space-y-10">
            {roles.map((role, i) => (
              <div key={i} className="md:pl-16 relative">
                <div className="hidden md:flex absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-stone-200 items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-sky-400" />
                </div>
                <div className="p-6 rounded-xl border border-stone-100 bg-white hover:border-stone-200 hover:shadow-sm transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-stone-900">{role.title}</h3>
                      <p className="text-sky-600 text-sm font-medium">{role.company}</p>
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
