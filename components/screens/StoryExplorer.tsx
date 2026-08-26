"use client";

import { Button } from "@/components/ui/Button";
import { boardSpaces } from "@/data/boardSpaces";
import { useGameStore } from "@/store/gameStore";

export function StoryExplorer() {
  const closeStoryExplorer = useGameStore((s) => s.closeStoryExplorer);
  const openAboutSpace = useGameStore((s) => s.openAboutSpace);
  const stories = boardSpaces.filter((space) => space.category === "about");

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-board-bg/95 p-4">
      <div className="mx-auto max-w-lg py-8">
        <h2 className="font-display text-3xl text-ink">Explorer mon histoire</h2>
        <p className="mt-2 text-ink-soft">
          Retrouve les cases personnelles, sans relancer le dé.
        </p>
        <ul className="mt-6 space-y-3">
          {stories.map((space) => (
            <li key={space.id}>
              <button
                type="button"
                onClick={() => openAboutSpace(space.id)}
                className="focus-ring w-full rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-line"
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-about">
                  Case {space.id}
                </p>
                <p className="font-display text-xl text-ink">{space.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{space.prompt}</p>
              </button>
            </li>
          ))}
        </ul>
        <Button variant="secondary" className="mt-6 w-full" onClick={closeStoryExplorer}>
          Retour à l’arrivée
        </Button>
      </div>
    </div>
  );
}
