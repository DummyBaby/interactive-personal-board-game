import type { Passion } from "@/types/game";

export const passionsData = {
  title: "Mes passions",
  subtitle: "Ce qui m’anime, tout simplement.",
  items: [
    {
      id: "photo",
      title: "Photographie",
      emoji: "📷",
      why: "Figer un instant et le raconter.",
      meaning: "Voir le quotidien autrement.",
      extra: "Lumière, rues, visages.",
    },
    {
      id: "food",
      title: "Cuisine",
      emoji: "🍳",
      why: "Partager une table, c’est partager un moment.",
      meaning: "Créer quelque chose de simple et bon.",
      extra: "Des recettes, des essais, des rires.",
    },
  ] satisfies Passion[],
};
