import { useState } from "react";
import { Ed } from "./primitives";

const R = 68;
const CX = 110;
const CY = 82;

function pt(angle: number) {
  return `${(CX + R * Math.cos(angle)).toFixed(1)} ${(CY - R * Math.sin(angle)).toFixed(1)}`;
}

export function GenderGauge({ editable }: { editable: boolean }) {
  const [male, setMale] = useState(79);
  const [female, setFemale] = useState(17);
  const [other, setOther] = useState(4);

  const total = male + female + other || 100;
  const mAngle = (male / total) * Math.PI;
  const fAngle = (female / total) * Math.PI;

  const p0 = "42 82";
  const p1 = pt(Math.PI - mAngle);
  const p2 = pt(Math.PI - mAngle - fAngle);
  const p3 = "178 82";

  const num = (t: string, fallback: number) =>
    parseFloat(t.replace(/[^0-9.]/g, "")) || fallback;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 2px" }}>
        <svg width="220" height="90" viewBox="0 0 220 90" style={{ overflow: "visible" }}>
          <path d="M 42 82 A 68 68 0 0 1 178 82" fill="none" stroke="#222429" strokeWidth={24} />
          <path d={`M ${p0} A ${R} ${R} 0 0 1 ${p1}`} fill="none" stroke="#80bdfb" strokeWidth={24} />
          <path d={`M ${p1} A ${R} ${R} 0 0 1 ${p2}`} fill="none" stroke="#527c9f" strokeWidth={24} />
          <path d={`M ${p2} A ${R} ${R} 0 0 1 ${p3}`} fill="none" stroke="#32495d" strokeWidth={24} />
        </svg>
      </div>

      <Legend color="#80bdfb" label="Male" value={`${male}%`} editable={editable} onInput={(t) => setMale(num(t, 79))} />
      <Legend color="#527c9f" label="Female" value={`${female}%`} editable={editable} onInput={(t) => setFemale(num(t, 17))} />
      <Legend color="#32495d" label="Other" value={`${other}% >`} editable={editable} onInput={(t) => setOther(num(t, 4))} />
    </>
  );
}

function Legend({
  color,
  label,
  value,
  editable,
  onInput,
}: {
  color: string;
  label: string;
  value: string;
  editable: boolean;
  onInput: (text: string) => void;
}) {
  return (
    <div className="tt-gender-legend">
      <div className="tt-gender-dot-label">
        <div className="tt-g-dot" style={{ background: color }} />
        <Ed editable={editable}>{label}</Ed>
      </div>
      <Ed style={{ fontWeight: 700 }} editable={editable} onInput={onInput}>
        {value}
      </Ed>
    </div>
  );
}
