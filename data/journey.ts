import type { TimelineEntry } from "@/types/game";

export const journeyData = {
  title: "Mon parcours",
  subtitle: "Les étapes qui m’ont mené jusqu’ici.",
  entries: [
    {
      id: "start",
      title: "Les débuts",
      period: "Enfance",
      description: "Curiosité, jeux, et premières envies de créer.",
    },
    {
      id: "now",
      title: "Aujourd’hui",
      period: "Maintenant",
      description: "J’avance un projet à la fois, avec plaisir.",
    },
  ] satisfies TimelineEntry[],
};
