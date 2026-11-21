export default function SectionHeader({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-xs text-amber">{index}</span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-mute">{label}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="grid md:grid-cols-[1fr_1fr] gap-6 md:gap-16 items-end">
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-fg leading-[1.05]">
          {title}
        </h2>
        {intro && <p className="text-fg-2 leading-relaxed max-w-md md:justify-self-end">{intro}</p>}
      </div>
    </div>
  );
}
