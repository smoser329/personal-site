import type { Incident } from "../engine";
import { INCIDENT_WINDOW } from "../data";

export default function IncidentBanner({ incident, now, onResolve }: { incident: Incident | null; now: number; onResolve: () => void }) {
  if (!incident) return null;
  const left = Math.max(0, incident.expiresAt - now);
  return (
    <div className="fixed top-4 inset-x-4 z-50 flex justify-center pointer-events-none">
      <button
        onClick={onResolve}
        className="pointer-events-auto w-full max-w-md text-left rounded-2xl border border-rose/50 bg-panel/95 backdrop-blur-xl shadow-[0_10px_40px_rgb(0_0_0/0.5)] overflow-hidden hover:border-rose transition-colors bugbash-pulse"
      >
        <div className="px-5 py-4 flex items-center gap-4">
          <span className="w-2.5 h-2.5 rounded-full bg-rose blink shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-rose">Production incident</span>
            <span className="block text-sm font-medium text-fg truncate">{incident.title}</span>
          </span>
          <span className="font-mono text-xs text-fg-2 shrink-0">Respond →</span>
        </div>
        <div className="h-1 bg-line">
          <div className="h-full bg-rose transition-[width] duration-100 ease-linear" style={{ width: `${(left / INCIDENT_WINDOW) * 100}%` }} />
        </div>
      </button>
    </div>
  );
}
