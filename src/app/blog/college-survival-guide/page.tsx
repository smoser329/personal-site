import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Engineering School Survival Guide — Samuel Moser",
  description:
    "The habits, mindsets, and tactics that actually worked in engineering school. From office hours to divide-and-conquer study strategies.",
};

export default function CollegeSurvivalGuide() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-stone-100">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
            ← Samuel Moser
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-600">
            Life
          </span>
          <h1 className="mt-4 text-4xl font-bold text-stone-900 leading-tight">
            Engineering School Survival Guide
          </h1>
          <p className="mt-3 text-stone-500">
            Things I wish someone told me before my first semester — and what actually worked.
          </p>
          <p className="mt-2 text-stone-400 text-sm">November 2026</p>
        </div>

        <div className="prose prose-stone max-w-none">

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
    <div className="mb-10">
      <h2 className="text-xl font-bold text-stone-900 mb-3">
        <span className="text-stone-300 mr-2 font-normal">{n}.</span>
        {title}
      </h2>
      <div className="text-stone-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-stone-600">
        {children}
      </div>
    </div>
  );
}
