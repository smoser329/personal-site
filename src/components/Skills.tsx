const categories = [
  {
    label: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "C#"],
  },
  {
    label: "Frontend",
    skills: ["Next.js", "React", "Tailwind CSS", "Figma"],
  },
  {
    label: "Backend & Data",
    skills: [".NET Framework", "Prisma", "PostgreSQL", "MySQL"],
  },
  {
    label: "Infrastructure",
    skills: ["Tanzu Application Services", "Traefik", "Vercel"],
  },
  {
    label: "Tooling",
    skills: ["Claude Code", "OpenCode", "Figma Make", "JIRA"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sky-500 font-medium text-sm tracking-widest uppercase mb-3">Skills</p>
        <h2 className="text-3xl font-bold text-stone-900 mb-12">Tech I work with</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.label} className="p-6 rounded-xl border border-stone-100 bg-stone-50">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="text-sm px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
