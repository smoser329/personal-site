import SectionHeader from "./SectionHeader";

const categories = [
  { label: "Languages", skills: ["TypeScript", "JavaScript", "Python", "C#", "MATLAB"] },
  { label: "Frontend", skills: ["Next.js", "React", "Tailwind CSS", "Tableau", "Figma"] },
  {
    label: "Backend & Data",
    skills: [".NET Framework", "FastAPI", "Prisma", "PostgreSQL", "MySQL", "GraphQL"],
  },
  {
    label: "DevSecOps",
    skills: ["GitLab CI/CD", "Docker", "Kubernetes", "AWS", "Tanzu Application Services", "Traefik"],
  },
  { label: "Tooling & AI", skills: ["Claude Code", "OpenCode", "Figma Make", "Metabase", "Airflow"] },
  {
    label: "Certifications",
    skills: ["DevSecOps Engineer (DOL)", "LM Certified DevSecOps", "Kubernetes CNA", "Scrum PO"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader index="03" label="Stack" title="Tech I work with" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-3xl overflow-hidden">
          {categories.map((cat, i) => (
            <div key={cat.label} className="bg-ink p-7 hover:bg-panel transition-colors">
              <div className="flex items-baseline justify-between mb-6">
                <p className="text-sm font-medium text-fg">{cat.label}</p>
                <span className="font-mono text-[11px] text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="space-y-2">
                {cat.skills.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-[15px] text-fg-2">
                    <span className="w-1 h-1 rounded-full bg-line-2" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
