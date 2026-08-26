"use client";

import { spaceById } from "@/data/boardSpaces";
import { useGameStore } from "@/store/gameStore";
import dynamic from "next/dynamic";

const QuizGame = dynamic(() => import("./QuizGame").then((m) => m.QuizGame), { ssr: false });
const HobbyGame = dynamic(() => import("./HobbyGame").then((m) => m.HobbyGame), { ssr: false });
const MemoryGame = dynamic(() => import("./MemoryGame").then((m) => m.MemoryGame), { ssr: false });
const WouldYouRatherGame = dynamic(
  () => import("./WouldYouRatherGame").then((m) => m.WouldYouRatherGame),
  { ssr: false },
);
const FinalQuiz = dynamic(() => import("./FinalQuiz").then((m) => m.FinalQuiz), { ssr: false });
const MysteryChallenge = dynamic(
  () => import("./MysteryChallenge").then((m) => m.MysteryChallenge),
  { ssr: false },
);
const SchoolSection = dynamic(
  () => import("@/components/about/SchoolSection").then((m) => m.SchoolSection),
  { ssr: false },
);
const JourneySection = dynamic(
  () => import("@/components/about/JourneySection").then((m) => m.JourneySection),
  { ssr: false },
);
const AchievementSection = dynamic(
  () => import("@/components/about/AchievementSection").then((m) => m.AchievementSection),
  { ssr: false },
);
const PassionsSection = dynamic(
  () => import("@/components/about/PassionsSection").then((m) => m.PassionsSection),
  { ssr: false },
);

export function ActivityRouter() {
  const activeActivity = useGameStore((s) => s.activeActivity);
  const space = activeActivity ? spaceById(activeActivity) : undefined;

  if (!space) return null;

  switch (space.type) {
    case "quiz":
      return <QuizGame />;
    case "school":
      return <SchoolSection />;
    case "hobby":
      return <HobbyGame />;
    case "memory":
      return <MemoryGame />;
    case "journey":
      return <JourneySection />;
    case "wouldYouRather":
      return <WouldYouRatherGame />;
    case "achievement":
      return <AchievementSection />;
    case "passions":
      return <PassionsSection />;
    case "finalQuiz":
      return <FinalQuiz />;
    case "mystery":
      return <MysteryChallenge />;
    default:
      return null;
  }
}
