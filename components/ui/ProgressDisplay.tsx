type Props = {
  completed: number;
  total?: number;
  position: number;
};

export function ProgressDisplay({ completed, total = 10, position }: Props) {
  const label =
    position <= 0 ? "Départ" : position >= 11 ? "Arrivée" : `Case ${position}`;

  return (
    <div className="min-w-0 rounded-2xl bg-card/90 px-3 py-2 text-center shadow-sm ring-1 ring-line">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink-soft">
        Progression
      </p>
      <p className="truncate font-display text-sm text-ink sm:text-base">
        {label} · {completed}/{total}
      </p>
    </div>
  );
}
