import type { BoardStop } from "@/types/game";

export const VIEWBOX = { w: 400, h: 760 };

export const BOARD_STOPS: BoardStop[] = [
  { id: 0, x: 200, y: 52, kind: "start" },
  { id: 1, x: 108, y: 118, kind: "space" },
  { id: 2, x: 210, y: 168, kind: "space" },
  { id: 3, x: 312, y: 214, kind: "space" },
  { id: 4, x: 278, y: 292, kind: "space" },
  { id: 5, x: 168, y: 338, kind: "space" },
  { id: 6, x: 78, y: 402, kind: "space" },
  { id: 7, x: 148, y: 478, kind: "space" },
  { id: 8, x: 268, y: 522, kind: "space" },
  { id: 9, x: 322, y: 598, kind: "space" },
  { id: 10, x: 218, y: 652, kind: "space" },
  { id: 11, x: 200, y: 728, kind: "finish" },
];

export const BOARD_PATH_D = [
  "M 200 52",
  "C 140 60, 100 90, 108 118",
  "C 120 155, 170 150, 210 168",
  "C 260 190, 300 190, 312 214",
  "C 330 250, 310 270, 278 292",
  "C 230 320, 200 320, 168 338",
  "C 110 360, 70 370, 78 402",
  "C 90 440, 110 450, 148 478",
  "C 190 510, 240 500, 268 522",
  "C 310 550, 340 565, 322 598",
  "C 300 635, 260 635, 218 652",
  "C 180 670, 200 700, 200 728",
].join(" ");

export function stopById(id: number): BoardStop {
  return BOARD_STOPS.find((stop) => stop.id === id) ?? BOARD_STOPS[0];
}

export function stopToPercent(stop: BoardStop): { left: string; top: string } {
  return {
    left: `${(stop.x / VIEWBOX.w) * 100}%`,
    top: `${(stop.y / VIEWBOX.h) * 100}%`,
  };
}
