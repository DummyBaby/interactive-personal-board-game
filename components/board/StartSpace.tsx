type Props = {
  x: number;
  y: number;
  active: boolean;
};

export function StartSpace({ x, y, active }: Props) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="-42"
        y="-22"
        rx="16"
        width="84"
        height="44"
        fill="#2f8f7a"
        stroke={active ? "#c9a227" : "#1f6d5c"}
        strokeWidth={active ? 4 : 3}
      />
      <text
        textAnchor="middle"
        y="6"
        fill="#fffdf8"
        fontSize="12"
        fontWeight="800"
        letterSpacing="0.6"
      >
        Départ
      </text>
    </g>
  );
}
