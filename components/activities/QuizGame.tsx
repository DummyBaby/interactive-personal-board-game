"use client";

import { QuizPlay } from "@/components/activities/QuizPlay";
import { ActivityFrame } from "@/components/ui/ActivityFrame";
import { quizQuestions } from "@/data/quizQuestions";
import { useGameStore } from "@/store/gameStore";

export function QuizGame() {
  const completeActivity = useGameStore((s) => s.completeActivity);
  const skipActivity = useGameStore((s) => s.skipActivity);
  const exploringStory = useGameStore((s) => s.exploringStory);

  return (
    <ActivityFrame
      eyebrow="Jeu"
      title="Défi quiz"
      subtitle="Connais-tu un peu la France ?"
      onBack={exploringStory ? skipActivity : undefined}
    >
      <QuizPlay questions={quizQuestions} maxScore={100} onDone={completeActivity} />
    </ActivityFrame>
  );
}
