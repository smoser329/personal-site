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
            <p className="text-lg text-stone-600 leading-relaxed max-w-lg mb-3">
              Software Engineer IV at Lockheed Martin — building AI-powered web applications
              for agile teams, leading DevSecOps transformation, and mentoring the next
              generation of engineers.
            </p>
            <p className="text-sm text-stone-400 leading-relaxed max-w-lg mb-8">
              Lean Agile CoE Lead Developer · Sensor Data Fusion Test Bed co-creator
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
              <a
                href="https://www.linkedin.com/in/samuel-moser-4737aa12b/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-stone-300 text-stone-700 text-sm font-medium rounded-lg hover:border-stone-500 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-xl ring-4 ring-stone-100">
              <Image
                src="/samuel.jpg"
                alt="Samuel Moser"
                fill
                className="object-cover"
                style={{ objectPosition: "center 5%" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
