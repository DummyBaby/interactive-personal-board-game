import type { MemoryItem, MemoryQuestion } from "@/types/game";

export const memoryGame = {
  title: "Défi mémoire",
  revealSeconds: 5,
  items: [
    { id: "1", label: "Baguette", emoji: "🥖" },
    { id: "2", label: "Livre", emoji: "📚" },
    { id: "3", label: "Vélo", emoji: "🚲" },
    { id: "4", label: "Caméra", emoji: "📷" },
    { id: "5", label: "Café", emoji: "☕" },
    { id: "6", label: "Avion", emoji: "✈️" },
  ] satisfies MemoryItem[],
  questions: [
    {
      id: 1,
      question: "Lequel de ces éléments est apparu à l’écran ?",
      options: ["🥖", "🎹", "🎯", "🧪"],
      correctAnswer: "🥖",
    },
    {
      id: 2,
      question: "Combien d’éléments as-tu vus ?",
      options: ["4", "5", "6", "7"],
      correctAnswer: "6",
    },
    {
      id: 3,
      question: "Lequel n’est PAS apparu ?",
      options: ["📚", "🍕", "🚲", "☕"],
      correctAnswer: "🍕",
    },
  ] satisfies MemoryQuestion[],
};
