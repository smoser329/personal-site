type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  href?: string;
};

const posts: Post[] = [
  {
    slug: "custom-games-turned-giants",
    title: "Custom Games That Became Industry Giants",
    excerpt:
      "Among Us, battle royale, League of Legends — they all started as StarCraft II custom games. What can we learn from how niche experiments become defining genres?",
    tag: "Gaming",
    date: "Coming soon",
  },
  {
    slug: "agile-in-the-ai-world",
    title: "Agile in the AI World: Story Points vs Tokens",
    excerpt:
      "AI doesn't work in sprints. When your team's velocity is measured in tokens, not story points, what does Agile even mean? A look at how estimation needs to evolve.",
    tag: "Engineering",
    date: "Coming soon",
  },
  {
    slug: "dual-operating-system",
    title: "The Dual Operating System",
    excerpt:
      "Every large company has two org charts: the official hierarchy and the organic network of people who actually get things done. Here's how to navigate both.",
    tag: "Leadership",
    date: "Coming soon",
  },
  {
    slug: "moving-to-a-new-city",
    title: "Moving to a New City as a Remote Worker",
    excerpt:
      "No office, no built-in social network, no excuses. What I learned from relocating to Miami about building community from scratch.",
    tag: "Life",
    date: "Coming soon",
  },
  {
    slug: "college-survival-guide",
    title: "Engineering School Survival Guide",
    excerpt:
      "Four years at Rutgers School of Engineering taught me more than thermodynamics. The habits, mindsets, and mistakes worth sharing.",
    tag: "Life",
    date: "Nov 2026",
    href: "/blog/college-survival-guide",
  },
  {
    slug: "tech-job-survival-guide",
    title: "Tech Job Survival Guide",
    excerpt:
      "Landing the job is only the beginning. The unwritten rules, habits, and mindsets that separate engineers who thrive from those who coast.",
    tag: "Engineering",
    date: "Coming soon",
  },
  {
    slug: "ultimate-swe-team-setup",
    title: "The Ultimate SWE Team Setup",
    excerpt:
      "Tooling, rituals, and culture decisions that make or break an engineering team. What I'd build from scratch if I were starting a team tomorrow.",
    tag: "Engineering",
    date: "Coming soon",
  },
  {
    slug: "importance-of-friends",
    title: "The Importance of Friends (Actually)",
    excerpt:
      "In a world optimized for productivity, friendship is the most underrated performance enhancer. A genuine argument for investing in your people.",
    tag: "Life",
    date: "Coming soon",
  },
];

const tagColors: Record<string, string> = {
  Gaming: "bg-purple-50 text-purple-600",
  Engineering: "bg-sky-50 text-sky-600",
  Leadership: "bg-amber-50 text-amber-600",
  Life: "bg-green-50 text-green-600",
};

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sky-500 font-medium text-sm tracking-widest uppercase mb-3">Blog</p>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Things I think about</h2>
        <p className="text-stone-500 mb-12 max-w-xl">
          Writing on engineering, leadership, gaming, and figuring out life. Posts dropping soon.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => {
            const inner = (
              <>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start ${tagColors[post.tag]}`}
                >
                  {post.tag}
                </span>
                <h3 className="font-semibold text-stone-900 leading-snug">{post.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <p className="text-stone-300 text-xs">{post.date}</p>
              </>
            );
            const cls = "p-6 rounded-xl border border-stone-100 bg-stone-50 flex flex-col gap-3 hover:border-stone-200 hover:shadow-sm transition-all";
            return post.href ? (
              <a
                key={post.slug}
                href={post.href}
                className={cls}
              >
                {inner}
              </a>
            ) : (
              <div key={post.slug} className={`${cls} cursor-pointer`}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
