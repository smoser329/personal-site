import Image from "next/image";

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
              of Engineering, graduating in 2021 with a 3.64 GPA and Dean&apos;s List honors.
              The systems thinking and analytical rigor I developed there shapes how I approach
              software every day.
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              What started as a summer internship in 2019 turned into a career defined by
              curiosity and continuous growth — from using AI to enhance Ballistic Missile Defense
              classifiers, to co-creating LM&apos;s Sensor Data Fusion Test Bed, to now leading
              a suite of six enterprise web applications as the Lean Agile Center of Excellence
              Lead Developer.
            </p>
            <p className="text-stone-600 leading-relaxed">
              I&apos;m a certified DevSecOps Engineer, Scrum Product Owner, and Kubernetes Cloud
              Native Associate. Outside of shipping software I mentor 10+ interns each year and
              advocate for Agile principles across a 3,000+ person program.
            </p>
          </div>
          <div className="space-y-5">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="relative w-full h-52">
                <Image
                  src="/samuel-ac130.jpg"
                  alt="Samuel Moser in front of AC-130 at Lockheed Martin Marietta"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="p-3 bg-stone-50 border-t border-stone-100">
                <p className="text-xs text-stone-400 text-center">At the C-130J Super Hercules facility, Marietta, GA</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-stone-100 bg-stone-50">
                <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
                  </svg>
                </div>
                <p className="font-semibold text-stone-900 text-sm">Rutgers Engineering</p>
                <p className="text-stone-500 text-xs mt-0.5">B.S. Mechanical Engineering</p>
                <p className="text-stone-400 text-xs">Aerospace · GPA 3.64 · 2021</p>
                <p className="text-stone-400 text-xs mt-1">Kappa Sigma · Dean&apos;s List</p>
              </div>
              <div className="p-5 rounded-xl border border-stone-100 bg-stone-50">
                <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <p className="font-semibold text-stone-900 text-sm">Certifications</p>
                <p className="text-stone-400 text-xs mt-1">DevSecOps Engineer</p>
                <p className="text-stone-400 text-xs">Kubernetes CNA</p>
                <p className="text-stone-400 text-xs">Scrum PO · DOL Apprenticeship</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
