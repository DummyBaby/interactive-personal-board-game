"use client";

import { QuizPlay } from "@/components/activities/QuizPlay";
import { ActivityFrame } from "@/components/ui/ActivityFrame";
import { finalQuiz } from "@/data/finalQuiz";
import { useGameStore } from "@/store/gameStore";

export function FinalQuiz() {
  const completeActivity = useGameStore((s) => s.completeActivity);
  const skipActivity = useGameStore((s) => s.skipActivity);
  const exploringStory = useGameStore((s) => s.exploringStory);

  return (
    <ActivityFrame
      variant="boss"
      eyebrow="Défi final"
      title={finalQuiz.title}
      subtitle={finalQuiz.subtitle}
      onBack={exploringStory ? skipActivity : undefined}
    >
      <QuizPlay
        questions={finalQuiz.questions}
        maxScore={250}
        onDone={completeActivity}
        boss
      />
    </ActivityFrame>
  );
}
