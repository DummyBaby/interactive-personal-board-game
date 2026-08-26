"use client";

import { BoardSpace } from "@/components/board/BoardSpace";
import { FinishSpace } from "@/components/board/FinishSpace";
import { PlayerToken } from "@/components/board/PlayerToken";
import { StartSpace } from "@/components/board/StartSpace";
import { boardSpaces } from "@/data/boardSpaces";
import { BOARD_PATH_D, BOARD_STOPS, VIEWBOX } from "@/lib/boardPath";
import { cn } from "@/lib/cn";

type Props = {
  position: number;
  passingPosition: number | null;
  completedSpaces: number[];
  decorative?: boolean;
  className?: string;
};

export function GameBoard({
  position,
  passingPosition,
  completedSpaces,
  decorative = false,
  className,
}: Props) {
  const start = BOARD_STOPS[0];
  const finish = BOARD_STOPS[BOARD_STOPS.length - 1];

  return (
    <div className={cn("relative mx-auto w-full max-w-lg", className)}>
      <svg
        viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Plateau sinueux de dix cases, du départ à l’arrivée"
      >
        <defs>
          <filter id="path-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.18" />
          </filter>
        </defs>
        <rect x="8" y="8" width="384" height="744" rx="36" fill="#f7f1e6" />
        <rect
          x="8"
          y="8"
          width="384"
          height="744"
          rx="36"
          fill="url(#none)"
          stroke="#d8cdbb"
          strokeWidth="3"
        />
        <path
          d={BOARD_PATH_D}
          fill="none"
          stroke="#1f6d5c"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
          transform="translate(0 4)"
        />
        <path
          d={BOARD_PATH_D}
          fill="none"
          stroke="#2f8f7a"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#path-shadow)"
        />
        <path
          d={BOARD_PATH_D}
          fill="none"
          stroke="#f4efe6"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="10 14"
          opacity="0.55"
        />
        <StartSpace x={start.x} y={start.y} active={position === 0} />
        {boardSpaces.map((space) => {
          const stop = BOARD_STOPS.find((s) => s.id === space.id);
          if (!stop) return null;
          return (
            <BoardSpace
              key={space.id}
              space={space}
              x={stop.x}
              y={stop.y}
              isCurrent={position === space.id}
              isPassing={passingPosition === space.id}
              isCompleted={completedSpaces.includes(space.id)}
            />
          );
        })}
        <FinishSpace x={finish.x} y={finish.y} active={position === 11} />
      </svg>
      {decorative ? null : (
        <PlayerToken position={position} />
      )}
    </div>
  );
}
