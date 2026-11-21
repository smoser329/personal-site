import Link from "next/link";
import Image from "next/image";
import SectionHeader from "./SectionHeader";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  href?: string;
  image?: string;
};

const posts: Post[] = [
  {
    slug: "college-survival-guide",
    title: "Engineering School Survival Guide",
    excerpt:
      "Four years at Rutgers School of Engineering taught me more than thermodynamics. The habits, mindsets, and mistakes worth sharing.",
    tag: "Life",
    date: "Nov 2026",
    href: "/blog/college-survival-guide",
    image: "/rutgers-orientation.jpg",
  },
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

export const tagColors: Record<string, string> = {
  Gaming: "text-lilac",
  Engineering: "text-sky",
  Leadership: "text-amber",
  Life: "text-sage",
};

export default function Blog() {
  const published = posts.filter((p) => p.href);
  const upcoming = posts.filter((p) => !p.href);

  return (
    <section id="blog" className="py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          index="05"
          label="Writing"
          title="Things I think about"
          intro="Writing on engineering, leadership, gaming, and figuring out life."
        />

        {published.map((post) => (
          <Link
            key={post.slug}
            href={post.href!}
            className="group grid md:grid-cols-[1fr_1.1fr] rounded-3xl overflow-hidden border border-line bg-panel hover:border-line-2 transition-colors mb-14"
          >
            {post.image && (
              <div className="relative h-56 md:h-auto min-h-[280px] overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 460px, 100vw"
                  className="photo object-cover group-hover:scale-[1.03]"
                  style={{ objectPosition: "center 30%" }}
                />
              </div>
            )}
            <div className="p-8 md:p-10 flex flex-col">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
                <span className="text-amber">Latest</span>
                <span className="text-dim">·</span>
                <span className={tagColors[post.tag]}>{post.tag}</span>
                <span className="text-dim">·</span>
                <span className="text-mute">{post.date}</span>
              </div>
              <h3 className="mt-5 font-display text-3xl md:text-4xl font-semibold tracking-tight text-fg leading-[1.1]">
                {post.title}
              </h3>
              <p className="mt-4 text-fg-2 leading-relaxed">{post.excerpt}</p>
              <span className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-medium text-fg group-hover:text-amber transition-colors">
                Read the post
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}

        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mute">In the hangar</span>
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-xs text-dim">{upcoming.length} drafts</span>
        </div>
        <ul>
          {upcoming.map((post) => (
            <li
              key={post.slug}
              className="grid md:grid-cols-[120px_1fr_auto] gap-x-8 gap-y-2 py-6 border-b border-line items-baseline"
            >
              <span className={`font-mono text-[11px] uppercase tracking-wider ${tagColors[post.tag]}`}>
                {post.tag}
              </span>
              <div>
                <h3 className="font-medium text-fg-2 text-lg leading-snug">{post.title}</h3>
                <p className="mt-1.5 text-mute text-sm leading-relaxed max-w-2xl">{post.excerpt}</p>
              </div>
              <span className="font-mono text-[11px] text-dim whitespace-nowrap">Soon</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
