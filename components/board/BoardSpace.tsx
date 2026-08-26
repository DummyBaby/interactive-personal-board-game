import { cn } from "@/lib/cn";
import type { BoardSpace as SpaceData } from "@/types/game";

type Props = {
  space: SpaceData;
  x: number;
  y: number;
  isCurrent: boolean;
  isPassing: boolean;
  isCompleted: boolean;
};

export function BoardSpace({
  space,
  x,
  y,
  isCurrent,
  isPassing,
  isCompleted,
}: Props) {
  const isGame = space.category === "game";
  const isSpecial = space.id === 9 || space.id === 10;
  const fill = isSpecial ? "#c45c4a" : isGame ? "#2f8f7a" : "#5b6abf";

  return (
    <g transform={`translate(${x} ${y})`} className={cn(isPassing && "origin-center")}>
      <circle
        r="30"
        fill="none"
        stroke={isCurrent || isPassing ? "#c9a227" : "transparent"}
        strokeWidth={isPassing ? 5 : 3}
        opacity={isPassing || isCurrent ? 1 : 0}
      />
      <circle r="24" fill="#fffdf8" stroke={fill} strokeWidth="5" />
      <circle r="18" fill={fill} />
      <text
        textAnchor="middle"
        y="6"
        fill="#fffdf8"
        fontSize="15"
        fontWeight="800"
      >
        {space.id}
      </text>
      {isCompleted ? (
        <g>
          <circle cx="16" cy="-16" r="8" fill="#c9a227" />
          <path
            d="M12.5 -16 l2.5 2.5 5 -5"
            fill="none"
            stroke="#fffdf8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      ) : null}
      <text
        y="44"
        textAnchor="middle"
        fill="#1c2430"
        fontSize="9"
        fontWeight="700"
      >
        {space.title.length > 16 ? `${space.title.slice(0, 15)}…` : space.title}
      </text>
    </g>
  );
}
