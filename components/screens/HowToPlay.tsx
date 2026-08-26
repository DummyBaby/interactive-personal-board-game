"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useGameStore } from "@/store/gameStore";

const STEPS = [
  "Lance le dé.",
  "Avance uniquement vers l’avant, case par case.",
  "Si le dé dépasse la case 10, tu restes sur place et tu relances.",
  "Quand tu arrives sur une case, une carte s’ouvre.",
  "Termine l’activité, puis reviens au plateau.",
  "Atteins la case 10, puis l’arrivée.",
];

export function HowToPlay() {
  const open = useGameStore((s) => s.howToPlayOpen);
  const closeHowToPlay = useGameStore((s) => s.closeHowToPlay);

  return (
    <Modal open={open} title="Comment jouer" onClose={closeHowToPlay}>
      <ol className="space-y-2 text-left">
        {STEPS.map((step, i) => (
          <li key={step} className="flex gap-3">
            <span className="font-display text-path">{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <Button className="mt-6 w-full" onClick={closeHowToPlay}>
        C’est compris
      </Button>
    </Modal>
  );
}
