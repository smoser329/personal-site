export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sky-500 font-medium text-sm tracking-widest uppercase mb-3">About</p>
            <h2 className="text-3xl font-bold text-stone-900 mb-5">Engineer by training,<br />builder by nature.</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              I studied Mechanical Engineering with an Aerospace concentration at Rutgers School
              of Engineering, graduating in 2021. The blend of systems thinking, physics, and
              problem-solving I developed there shapes how I approach software every day.
            </p>
            <p className="text-stone-600 leading-relaxed">
              What started as a 2019 internship at Lockheed Martin turned into a career defined
              by curiosity and growth — from testing naval weapons systems to leading a team of
              engineers building internal platforms used across the enterprise.
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-stone-100 bg-stone-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Rutgers School of Engineering</p>
                  <p className="text-stone-500 text-sm">B.S. Mechanical Engineering · Aerospace Concentration</p>
                  <p className="text-stone-400 text-sm">New Brunswick, NJ · Class of 2021</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl border border-stone-100 bg-stone-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Miami, FL</p>
                  <p className="text-stone-500 text-sm">Currently based in South Florida</p>
                  <p className="text-stone-400 text-sm">Working fully remote</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
