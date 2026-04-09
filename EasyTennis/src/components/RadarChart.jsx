/* Radar chart — pure SVG, no deps */
export default function RadarChart({ skills, size = 220 }) {
  const cx = size / 2;
  const cy = size / 2;
  const R  = size * 0.36;
  const n  = skills.length;

  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const point = (i, r) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });

  const poly = (r) =>
    skills.map((_, i) => {
      const p = point(i, r);
      return `${p.x},${p.y}`;
    }).join(' ');

  const dataPoints = skills.map((s, i) => {
    const p = point(i, R * (s.value / 100));
    return `${p.x},${p.y}`;
  }).join(' ');

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ display: 'block' }}>
      {/* Grid rings */}
      {rings.map((r, ri) => (
        <polygon
          key={ri}
          points={poly(R * r)}
          fill="none"
          stroke="var(--surface-3)"
          strokeWidth="1"
        />
      ))}
      {/* Spokes */}
      {skills.map((_, i) => {
        const p = point(i, R);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--surface-3)" strokeWidth="1" />;
      })}
      {/* Data polygon */}
      <polygon
        points={dataPoints}
        fill="rgba(46,125,79,0.18)"
        stroke="var(--court)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Data dots */}
      {skills.map((s, i) => {
        const p = point(i, R * (s.value / 100));
        return (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--court)" stroke="var(--white)" strokeWidth="2" />
        );
      })}
      {/* Labels */}
      {skills.map((s, i) => {
        const lp = point(i, R * 1.28);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y + 4}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fontFamily="DM Sans, sans-serif"
            fill="var(--muted)"
            letterSpacing="0.3"
          >
            {s.label}
          </text>
        );
      })}
    </svg>
  );
}
