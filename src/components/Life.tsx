const hobbies = [
  {
    emoji: "🏄",
    title: "Wakesurfing",
    description: "Riding wakes on South Florida's waterways — the perfect way to unplug.",
  },
  {
    emoji: "🎾",
    title: "Beach Tennis",
    description: "Fast-growing sport that combines the best of tennis and beach volleyball.",
  },
  {
    emoji: "🏃",
    title: "Run Club",
    description: "Weekly group runs through Miami — equal parts fitness and community.",
  },
  {
    emoji: "🏔️",
    title: "Snowboarding",
    description: "Chasing powder whenever the Miami heat gets old. Mountains are the reset button.",
  },
];

export default function Life() {
  return (
    <section id="life" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sky-500 font-medium text-sm tracking-widest uppercase mb-3">Life</p>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Outside the code editor</h2>
        <p className="text-stone-500 mb-12 max-w-xl">
          The best engineers I know have rich lives outside work. Here&apos;s how I spend mine.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hobbies.map((h) => (
            <div
              key={h.title}
              className="p-6 rounded-xl border border-stone-100 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="text-3xl mb-4">{h.emoji}</div>
              <h3 className="font-semibold text-stone-900 mb-2">{h.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{h.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
