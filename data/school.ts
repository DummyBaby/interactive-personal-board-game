import type { SchoolSection } from "@/types/game";

export const schoolData = {
  title: "Mon école",
  subtitle: "Un petit aperçu de mon univers scolaire.",
  collegeName: "Lycée Jean Moulin",
  course: "Sciences",
  campus: "Campus centre-ville",
  sections: [
    {
      id: "college",
      title: "Mon établissement",
      description: "Un lycée où j’ai appris à travailler en équipe.",
      detail: "Les couloirs, la cour, et beaucoup de projets de groupe.",
    },
  ] satisfies SchoolSection[],
};
