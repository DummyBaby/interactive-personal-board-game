import type { AchievementBeat } from "@/types/game";

export const achievementData = {
  title: "Ma fierté",
  subtitle: "Un moment dont je suis fier.",
  badge: "Un vrai défi relevé",
  beats: [
    {
      id: "why",
      title: "Pourquoi ça compte",
      body: "Avoir fini ce que j’avais commencé, même quand c’était dur.",
    },
  ] satisfies AchievementBeat[],
};
