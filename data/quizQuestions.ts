import type { QuizQuestion } from "@/types/game";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "multipleChoice",
    question: "Quelle est la capitale de la France ?",
    options: ["Paris", "Lyon", "Marseille", "Bordeaux"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    type: "multipleChoice",
    question: "Quel monument célèbre se trouve à Paris ?",
    options: ["La Tour Eiffel", "Le Colisée", "Big Ben", "La Sagrada Família"],
    correctAnswer: "La Tour Eiffel",
  },
  {
    id: 3,
    type: "multipleChoice",
    question: "Quelle est la devise de la France ?",
    options: [
      "Liberté, Égalité, Fraternité",
      "Unité, Travail, Progrès",
      "Dieu et mon droit",
      "Ordre et liberté",
    ],
    correctAnswer: "Liberté, Égalité, Fraternité",
  },
  {
    id: 4,
    type: "multipleChoice",
    question: "Quelles sont les couleurs du drapeau français ?",
    options: [
      "Bleu, blanc, rouge",
      "Vert, blanc, rouge",
      "Rouge, jaune, rouge",
      "Noir, rouge, or",
    ],
    correctAnswer: "Bleu, blanc, rouge",
  },
  {
    id: 5,
    type: "multipleChoice",
    question: "Quel fleuve traverse Paris ?",
    options: ["La Seine", "La Loire", "Le Rhône", "La Garonne"],
    correctAnswer: "La Seine",
  },
];
