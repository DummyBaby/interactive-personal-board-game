import type { MysteryQuestion } from "@/types/game";

export const mysteryChallenge = {
  title: "Défi mystère",
  subtitle: "Questions rapides. Réponds-en le plus possible.",
  seconds: 30,
  questions: [
    {
      id: 1,
      question: "Quelle ville accueille le festival de Cannes ?",
      options: ["Cannes", "Nice", "Monaco"],
      correctAnswer: "Cannes",
    },
    {
      id: 2,
      question: "Quel animal symbolise souvent la France ?",
      options: ["Le coq", "L’aigle", "Le lion"],
      correctAnswer: "Le coq",
    },
    {
      id: 3,
      question: "Dans quelle ville se trouve le château de Versailles ?",
      options: ["Versailles", "Fontainebleau", "Chambord"],
      correctAnswer: "Versailles",
    },
    {
      id: 4,
      question: "Quel dessert est une pâte choux en forme de cygne ou d’éclair cousin ?",
      options: ["Le chou à la crème", "La tarte tatin", "Le flan"],
      correctAnswer: "Le chou à la crème",
    },
    {
      id: 5,
      question: "Quel océan borde la côte ouest de la France ?",
      options: ["L’océan Atlantique", "L’océan Pacifique", "L’océan Indien"],
      correctAnswer: "L’océan Atlantique",
    },
    {
      id: 6,
      question: "Quelle langue est officielle en France ?",
      options: ["Le français", "L’occitan", "Le breton"],
      correctAnswer: "Le français",
    },
    {
      id: 7,
      question: "Quel palais abrite le président de la République ?",
      options: ["L’Élysée", "Matignon", "Le Luxembourg"],
      correctAnswer: "L’Élysée",
    },
    {
      id: 8,
      question: "Quelle boisson est liée à la région de Champagne ?",
      options: ["Le champagne", "Le cidre", "L’absinthe"],
      correctAnswer: "Le champagne",
    },
  ] satisfies MysteryQuestion[],
};
