import Image from "next/image";
import SectionHeader from "./SectionHeader";

const hobbies = [
  {
    emoji: "🏄",
    title: "Wakesurfing",
    description: "Riding wakes on South Florida's waterways — the perfect way to disconnect.",
  },
  {
    emoji: "🎾",
    title: "Beach Tennis",
    description: "Fast-growing sport that blends the best of tennis and beach volleyball.",
  },
  {
    emoji: "🏃",
    title: "Run Club",
    description: "Weekly group runs through Miami — equal parts fitness and community.",
  },
  {
    emoji: "🏔️",
    title: "Snowboarding",
    description: "Chasing powder whenever the Miami heat needs a reset. Mountains are therapy.",
  },
];

function Photo({
  src,
  alt,
  caption,
  position,
  className,
}: {
  src: string;
  alt: string;
  caption: string;
  position?: string;
  className?: string;
}) {
  return (
    <figure className={`group relative rounded-3xl overflow-hidden border border-line bg-panel ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 480px, 100vw"
        className="photo object-cover group-hover:scale-[1.03]"
        style={{ objectPosition: position ?? "center" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 to-transparent" />
      <figcaption className="absolute bottom-4 left-5 font-mono text-[11px] text-fg-2">{caption}</figcaption>
    </figure>
  );
}

export default function Life() {
  return (
    <section id="life" className="py-28 bg-ink-2 border-y border-line">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          index="04"
          label="Life"
          title={
            <>
              Outside the
              <br />
              <span className="text-mute">code editor.</span>
            </>
          }
          intro="The best engineers I know have rich lives outside work. Here's how I spend mine."
        />

        <div className="grid md:grid-cols-[1.35fr_1fr] gap-4 mb-14">
          <Photo
            src="/wakesurfing.jpg"
            alt="Samuel Moser wakesurfing in Miami"
            caption="Wakesurfing · Miami"
            className="h-80 md:h-[460px]"
          />
          <Photo
            src="/snowboarding.jpg"
            alt="Samuel Moser snowboarding above the clouds"
            caption="Snowboarding above the clouds"
            position="center 70%"
            className="h-80 md:h-[460px]"
          />
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {hobbies.map((h) => (
            <li key={h.title} className="border-t border-line-2 pt-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl grayscale-[0.3]" aria-hidden>
                  {h.emoji}
                </span>
                <h3 className="font-medium text-fg">{h.title}</h3>
              </div>
              <p className="text-mute text-sm leading-relaxed">{h.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
