import Image from "next/image";

const hobbies = [
  {
    emoji: "🏄",
    title: "Wakesurfing",
    description: "Riding wakes on South Florida's waterways — the perfect way to disconnect.",
    image: "/wakesurfing.jpg",
  },
  {
    emoji: "🎾",
    title: "Beach Tennis",
    description: "Fast-growing sport that blends the best of tennis and beach volleyball.",
    image: null,
  },
  {
    emoji: "🏃",
    title: "Run Club",
    description: "Weekly group runs through Miami — equal parts fitness and community.",
    image: null,
  },
  {
    emoji: "🏔️",
    title: "Snowboarding",
    description: "Chasing powder whenever the Miami heat needs a reset. Mountains are therapy.",
    image: "/snowboarding.jpg",
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

        {/* Photo pair */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="rounded-xl overflow-hidden shadow-md">
            <div className="relative w-full h-64 md:h-80">
              <Image
                src="/wakesurfing.jpg"
                alt="Samuel Moser wakesurfing in Miami"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="p-2 bg-stone-50 border-t border-stone-100">
              <p className="text-xs text-stone-400 text-center">Wakesurfing, Miami</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-md">
            <div className="relative w-full h-64 md:h-80">
              <Image
                src="/snowboarding.jpg"
                alt="Samuel Moser snowboarding above the clouds"
                fill
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
              />
            </div>
            <div className="p-2 bg-stone-50 border-t border-stone-100">
              <p className="text-xs text-stone-400 text-center">Snowboarding above the clouds</p>
            </div>
          </div>
        </div>

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
