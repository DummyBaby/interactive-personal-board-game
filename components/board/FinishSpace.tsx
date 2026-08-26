type Props = {
  x: number;
  y: number;
  active: boolean;
};

export function FinishSpace({ x, y, active }: Props) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="-50"
        y="-22"
        rx="16"
        width="100"
        height="44"
        fill="#c45c4a"
        stroke={active ? "#c9a227" : "#8f3d32"}
        strokeWidth={active ? 4 : 3}
      />
      <text
        textAnchor="middle"
        y="6"
        fill="#fffdf8"
        fontSize="12"
        fontWeight="800"
        letterSpacing="0.4"
      >
        Arrivée
      </text>
    </g>
  );
}
