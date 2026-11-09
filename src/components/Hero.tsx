import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="max-w-5xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sky-500 font-medium text-sm tracking-widest uppercase mb-3">
              Miami, FL
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-stone-900 leading-tight mb-5">
              Samuel<br />Moser
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed max-w-lg mb-8">
              Staff Software Engineer driving organizational agility at Lockheed Martin —
              through the products I ship, the engineers I mentor, and the culture I help build.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#experience"
                className="px-5 py-2.5 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors"
              >
                My Work
              </a>
              <a
                href="#blog"
                className="px-5 py-2.5 border border-stone-300 text-stone-700 text-sm font-medium rounded-lg hover:border-stone-500 transition-colors"
              >
                Read the Blog
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-xl ring-4 ring-stone-100">
              <Image
                src="/samuel.jpg"
                alt="Samuel Moser"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
