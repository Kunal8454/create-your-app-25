import { useEffect, useRef, useState } from "react";
import { Ed } from "./primitives";

export type Metric = {
  name: string;
  value: string;
  max: string;
  mid: string;
  low: string;
  points: number[];
};

const X0 = 15;
const X1 = 295;
const YTOP = 30;
const YBOT = 175;

export function MetricChart({
  metric,
  labels,
  editable,
}: {
  metric: Metric;
  labels: string[];
  editable: boolean;
}) {
  const [selected, setSelected] = useState(metric.points.length - 2);
  const storeKey = `tt-chart:${metric.name}`;
  const [points, setPoints] = useState<number[]>(metric.points);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragIdx = useRef<number | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      setPoints(raw ? (JSON.parse(raw) as number[]) : metric.points);
    } catch {
      setPoints(metric.points);
    }
  }, [storeKey, metric.points]);
  const baseMax = Math.max(...metric.points, 1);
  const n = points.length;
  const maxVal = Math.max(...points, 1);
  const step = (X1 - X0) / (n - 1);
  const xs = points.map((_, i) => X0 + i * step);
  const ys = points.map((v) => YBOT - (v / maxVal) * (YBOT - YTOP));

  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${ys[i]!.toFixed(1)}`).join(" ");
  const area = `${line} L ${X1} ${YBOT} L ${X0} ${YBOT} Z`;

  const sel = Math.min(selected, n - 1);
  const selX = xs[sel]!;
  const selY = ys[sel]!;

  return (
    <div className="tt-chart-box">
      <svg
        ref={svgRef}
        onPointerMove={(e) => {
          if (dragIdx.current === null || !svgRef.current) return;
          const r = svgRef.current.getBoundingClientRect();
          const y = ((e.clientY - r.top) / r.height) * 200;
          const frac = Math.min(Math.max((YBOT - y) / (YBOT - YTOP), 0), 1.3);
          const i = dragIdx.current;
          setPoints((prev) => {
            const next = prev.map((v, j) => (j === i ? Math.round(frac * baseMax * 100) / 100 : v));
            try { localStorage.setItem(storeKey, JSON.stringify(next)); } catch { /* ignore */ }
            return next;
          });
        }}
        onPointerUp={() => (dragIdx.current = null)}
        onPointerLeave={() => (dragIdx.current = null)}
        style={{ overflow: "visible", touchAction: editable ? "none" : "auto" }}
        width="100%" height="200" viewBox="0 0 350 200">
        <defs>
          <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5b9bf6" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#5b9bf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="15" y1="30" x2="295" y2="30" className="tt-grid-line" />
        <line x1="15" y1="85" x2="295" y2="85" className="tt-grid-line" />
        <line x1="15" y1="140" x2="295" y2="140" className="tt-grid-line" />
        <path fill="url(#curveGrad)" d={area} />
        <path className="tt-chart-curve" d={line} />
        <line x1={selX} y1={YTOP} x2={selX} y2={YBOT} stroke="#1f6fd8" strokeWidth={1.5} />
        {xs.map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={ys[i]}
            r={i === sel ? 6 : editable ? 5 : 3.4}
            className={`tt-chart-pt${i === sel ? " active" : ""}`}
            onClick={() => setSelected(i)}
            onPointerDown={(e) => {
              setSelected(i);
              if (!editable) return;
              dragIdx.current = i;
              (e.target as Element).releasePointerCapture?.(e.pointerId);
            }}
          />
        ))}
      </svg>

      <div className="tt-y-axis">
        <span className="tt-y-lbl" style={{ top: 22 }}>
          <Ed editable={editable}>{metric.max}</Ed>
        </span>
        <span className="tt-y-lbl" style={{ top: 77 }}>
          <Ed editable={editable}>{metric.mid}</Ed>
        </span>
        <span className="tt-y-lbl" style={{ top: 132 }}>
          <Ed editable={editable}>{metric.low}</Ed>
        </span>
      </div>

      <div className="tt-x-axis">
        <Ed className="tt-x-lbl" editable={editable}>
          {labels[0]}
        </Ed>
        <Ed className="tt-x-lbl" editable={editable}>
          {labels[labels.length - 1]}
        </Ed>
      </div>

      <div
        className="tt-tooltip"
        style={{
          left: `${Math.min(Math.max((selX / 350) * 100, 6), 74)}%`,
          top: Math.max(selY - 56, 0),
        }}
      >
        <div className="tt-tt-date">{labels[sel]}</div>
        <div className="tt-tt-val">{formatValue(points[sel]!)}</div>
      </div>
    </div>
  );
}

function formatValue(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return `${Math.round(v * 100) / 100}`;
}
