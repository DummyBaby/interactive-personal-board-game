import type { WouldYouRatherQuestion } from "@/types/game";

export const wouldYouRather: { questions: WouldYouRatherQuestion[] } = {
  questions: [
    {
      id: 1,
      prompt: "Je préférerais…",
      a: "Partir découvrir une nouvelle ville",
      b: "Rester chez moi pour un projet perso",
      answer: "b",
    },
    {
      id: 2,
      prompt: "Je préférerais…",
      a: "Un café terrasse le matin",
      b: "Une soirée films jusqu’à tard",
      answer: "a",
    },
    {
      id: 3,
      prompt: "Je préférerais…",
      a: "Cuisiner un grand plat pour des amis",
      b: "Commander et tout simplifier",
      answer: "a",
    },
    {
      id: 4,
      prompt: "Je préférerais…",
      a: "Une randonnée en montagne",
      b: "Une journée au musée",
      answer: "b",
    },
  ],
};
