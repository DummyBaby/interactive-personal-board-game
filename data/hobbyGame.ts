import type { HobbyClue } from "@/types/game";

export const hobbyGame = {
  title: "Mon hobby",
  subtitle: "Je révèle les indices un par un.",
  clues: [
    { id: 1, text: "Je sors souvent avec un objet autour du cou… et ce n’est pas un collier." },
    { id: 2, text: "J’aime figer un instant : un sourire, une rue, une lumière." },
    { id: 3, text: "Ensuite, je passe du temps à recadrer, à choisir les couleurs, à raconter une histoire." },
    { id: 4, text: "Indice bonus : clic." },
  ] satisfies HobbyClue[],
  options: ["La photographie", "Le jardinage", "Le piano", "La course à pied"],
  correctAnswer: "La photographie",
  reveal: "C’est la photographie : capturer un moment et le garder.",
};
