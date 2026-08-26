import type { QuizQuestion } from "@/types/game";

export const finalQuiz: {
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
} = {
  title: "Quiz final",
  subtitle: "Un peu plus corsé. Prêt pour le grand défi ?",
  questions: [
    {
      id: 1,
      type: "multipleChoice",
      question: "Quel est le plus haut sommet de France métropolitaine ?",
      options: ["Le mont Blanc", "Le pic du Midi", "Le puy de Dôme", "Le mont Ventoux"],
      correctAnswer: "Le mont Blanc",
    },
    {
      id: 2,
      type: "multipleChoice",
      question: "Qui a écrit Les Misérables ?",
      options: ["Victor Hugo", "Émile Zola", "Albert Camus", "Molière"],
      correctAnswer: "Victor Hugo",
    },
    {
      id: 3,
      type: "multipleChoice",
      question: "Que célèbre-t-on le 14 juillet en France ?",
      options: [
        "La fête nationale",
        "La Saint-Valentin",
        "La Toussaint",
        "Le premier de l’an",
      ],
      correctAnswer: "La fête nationale",
    },
    {
      id: 4,
      type: "multipleChoice",
      question: "Dans quel musée parisien peut-on voir La Joconde ?",
      options: ["Le Louvre", "Orsay", "Le Centre Pompidou", "Le musée Rodin"],
      correctAnswer: "Le Louvre",
    },
    {
      id: 5,
      type: "multipleChoice",
      question: "Quelle ville est souvent surnommée la capitale de la gastronomie française ?",
      options: ["Lyon", "Nice", "Lille", "Nantes"],
      correctAnswer: "Lyon",
    },
    {
      id: 6,
      type: "multipleChoice",
      question: "Combien y a-t-il de régions en France métropolitaine aujourd’hui ?",
      options: ["13", "18", "22", "27"],
      correctAnswer: "13",
    },
    {
      id: 7,
      type: "multipleChoice",
      question: "Quel fromage français est célèbre pour ses trous ?",
      options: ["L’emmental", "Le camembert", "Le roquefort", "Le reblochon"],
      correctAnswer: "L’emmental",
    },
    {
      id: 8,
      type: "multipleChoice",
      question: "Quelle mer borde la Côte d’Azur ?",
      options: ["La mer Méditerranée", "La mer du Nord", "La mer Baltique", "La mer Noire"],
      correctAnswer: "La mer Méditerranée",
    },
  ],
};
