import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Engineering School Survival Guide — Samuel Moser",
  description:
    "The habits, mindsets, and tactics that actually worked in engineering school. From office hours to divide-and-conquer study strategies.",
};

export default function CollegeSurvivalGuide() {
  return (
    <div className="min-h-screen bg-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/#blog" className="group inline-flex items-center gap-2 text-sm text-mute hover:text-fg transition-colors">
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            Samuel Moser
          </Link>
          <span className="font-mono text-[11px] text-dim">12 lessons · 5 min read</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-20 pb-28">
        <div className="mb-12">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
            <span className="text-sage">Life</span>
            <span className="text-dim">·</span>
            <span className="text-mute">November 2026</span>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,4rem)] font-semibold tracking-[-0.03em] text-fg leading-[1.02]">
            Engineering School Survival Guide
          </h1>
          <p className="mt-6 text-xl text-fg-2 leading-relaxed">
            Things I wish someone told me before my first semester — and what actually worked.
          </p>
        </div>

        <figure className="mb-16 -mx-6 md:-mx-16">
          <div className="relative h-72 md:h-[420px] md:rounded-3xl overflow-hidden border-y md:border border-line bg-panel">
            <Image
              src="/rutgers-orientation.jpg"
              alt="Samuel Moser at Rutgers orientation with the Scarlet Knight mascot"
              fill
              sizes="(min-width: 768px) 800px, 100vw"
              className="photo object-cover"
              style={{ objectPosition: "center 30%" }}
              priority
            />
          </div>
          <figcaption className="mt-3 px-6 md:px-16 font-mono text-[11px] text-dim">
            Day one at Rutgers. Didn&apos;t know anyone. Turned out okay.
          </figcaption>
        </figure>

        <div>

          <Section n="1" title="Make Friends">
            <p>
              Your classmates are your greatest resource. The people sitting next to you in lecture
              will be your study partners, your references, and eventually your professional network.
              Introduce yourself early and often.
            </p>
          </Section>

          <Section n="2" title="Join the Group Chats">
            <p>
              Every class has a group chat. Find it and join it. This is where homework hints get
              shared, exam times get confirmed, and study sessions get organized. Don't be the person
              who misses a reschedule because they weren't in the loop.
            </p>
          </Section>

          <Section n="3" title="Go to Every Office Hour">
            <p>
              And go even when you don't have a question. Bring your homework and do it there.
            </p>
            <ul>
              <li>
                I've had points <strong>added back to my quizzes</strong> simply from reviewing them
                with the professor at office hours.
              </li>
              <li>Professors will drop hints about upcoming exams and quizzes.</li>
              <li>
                Instead of staying stuck on a problem for an hour, save it for office hours. Spend
                your time on problems you can actually move through.
              </li>
            </ul>
          </Section>

          <Section n="4" title="Go to Every Student-Led Tutoring and Study Group">
            <p>
              TA sessions, peer tutoring, and informal study groups reinforce concepts in a way solo
              studying doesn't. Hearing things explained in different ways makes them stick.
            </p>
          </Section>

          <Section n="5" title="Write Notes on Paper">
            <p>
              Handwriting engages your brain differently than typing. When you write by hand, you're
              forced to summarize and process, not just transcribe. Use paper for problem sets and
              equations especially.
            </p>
          </Section>

          <Section n="6" title={<>Read <em>A Mind for Numbers</em></>}>
            <p>
              By Barbara Oakley. One semester I read this book and got a <strong>4.0</strong>. It
              teaches you <em>how</em> to learn math and science: spaced repetition, interleaving,
              and the focused vs. diffuse thinking modes. Read it before the semester starts.
            </p>
          </Section>

          <Section n="7" title="Skim the Slides Before Lecture">
            <p>
              Read or skim the slides the day before lecture — or while you're waiting for class to
              start, or on your commute. You don't need to understand everything. You just need your
              brain to have seen it once so lecture feels like review, not a firehose.
            </p>
          </Section>

          <Section n="8" title="Use Repetition and Mnemonic Devices">
            <p>You will not remember a formula after seeing it once. Build in repetition:</p>
            <ul>
              <li>Rewrite key equations from memory</li>
              <li>Create mnemonics for lists and sequences</li>
              <li>Use flashcards (Anki is great) for definitions and identities</li>
              <li>Space your review — don't cram the night before</li>
            </ul>
          </Section>

          <Section n="9" title="Find the Experts">
            <p>
              Every engineering student is an expert at <em>something</em>. One person crushes
              circuits. Another gets thermodynamics intuitively. Find them and reach out when you're
              stuck. And <strong>become an expert yourself</strong> — pick a subject and own it.
              That reputation will come back to you.
            </p>
          </Section>

          <Section n="10" title="Divide and Conquer">
            <p>
              If you and a friend both have two assignments due, split the work: you do Assignment A
              and teach it to them, they do Assignment B and teach it to you. This is almost always
              faster than both of you doing both assignments alone — and you each understand both by
              the end.
            </p>
          </Section>

          <Section n="11" title="Treat It Like a 9–5">
            <p>
              Don't study at random hours or whenever you feel motivated. Motivation is unreliable.
              Go to the library on a consistent schedule like a shift. Show up at 9, leave at 5.
              When you're there, you work. When you leave, you're done. Consistency beats intensity.
            </p>
          </Section>

          <Section n="12" title="Build Your Day Around Studying">
            <p>
              Studying is the job. Everything else — meals, workouts, social plans — gets scheduled
              around it, not the other way around. When you treat studying as the fixed anchor of
              your day, everything else falls into place.
            </p>
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-[44px_1fr] md:grid-cols-[64px_1fr] py-9 border-t border-line">
      <span className="font-mono text-sm text-amber pt-1.5">{n.padStart(2, "0")}</span>
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-fg mb-4 leading-snug">
          {title}
        </h2>
        <div className="text-fg-2 text-[17px] leading-[1.75] space-y-4 [&_ul]:space-y-2 [&_ul]:pl-0 [&_li]:relative [&_li]:pl-5 [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.8em] [&_li]:before:w-2 [&_li]:before:h-px [&_li]:before:bg-mute [&_strong]:text-fg [&_strong]:font-semibold [&_em]:text-fg">
          {children}
        </div>
      </div>
    </section>
  );
}
