import { useRef, type ReactNode } from "react";

export function Ed({
  children,
  className,
  style,
  editable,
  onInput,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  editable: boolean;
  onInput?: (text: string) => void;
}) {
  return (
    <span
      className={className}
      style={style}
      contentEditable={editable}
      suppressContentEditableWarning
      spellCheck={false}
      onInput={(e) => onInput?.(e.currentTarget.innerText)}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="tt-card" style={style}>
      {children}
    </div>
  );
}

export function CardTitle({
  title,
  info = true,
  editable,
}: {
  title: string;
  info?: boolean;
  editable: boolean;
}) {
  return (
    <div className="tt-card-title">
      <Ed editable={editable}>{title}</Ed>
      {info ? <span className="tt-info">i</span> : null}
    </div>
  );
}

export type BarItem = { label: string; pct: number; pctStr: string; arrow?: boolean };

export function ProgressList({ data, editable }: { data: BarItem[]; editable: boolean }) {
  return (
    <div style={{ marginTop: 12 }}>
      {data.map((item, i) => (
        <ProgressRow key={i} item={item} editable={editable} />
      ))}
    </div>
  );
}

function ProgressRow({ item, editable }: { item: BarItem; editable: boolean }) {
  const fillRef = useRef<HTMLDivElement>(null);
  return (
    <div className="tt-prog-row">
      <div className="tt-prog-header">
        <Ed className="tt-prog-label" editable={editable}>
          {item.label}
        </Ed>
        <Ed
          className="tt-prog-pct"
          editable={editable}
          onInput={(text) => {
            const num = parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
            if (fillRef.current) fillRef.current.style.width = `${Math.min(num, 100)}%`;
          }}
        >
          {item.pctStr}
          {item.arrow ? " >" : ""}
        </Ed>
      </div>
      <div className="tt-prog-track">
        <div
          ref={fillRef}
          className="tt-prog-fill"
          style={{ width: `${Math.min(item.pct, 100)}%` }}
        />
      </div>
    </div>
  );
}

export function DualBar({
  leftPct,
  rightPct,
  leftLabel,
  rightLabel,
  editable,
}: {
  leftPct: string;
  rightPct: string;
  leftLabel: string;
  rightLabel: string;
  editable: boolean;
}) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const initial = parseFloat(leftPct) || 0;
  return (
    <div style={{ marginTop: 18 }}>
      <div className="tt-dual-nums">
        <Ed
          editable={editable}
          onInput={(text) => {
            const num = parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
            if (leftRef.current) leftRef.current.style.width = `${Math.min(num, 100)}%`;
            if (rightRef.current) rightRef.current.style.width = `${Math.max(100 - num, 0)}%`;
          }}
        >
          {leftPct}
        </Ed>
        <Ed editable={editable}>{rightPct}</Ed>
      </div>
      <div className="tt-dual-track">
        <div ref={leftRef} style={{ width: `${initial}%`, backgroundColor: "#80bdfb" }} />
        <div ref={rightRef} style={{ width: `${100 - initial}%`, backgroundColor: "#527c9f" }} />
      </div>
      <div className="tt-dual-labels">
        <Ed editable={editable}>{leftLabel}</Ed>
        <Ed editable={editable}>{rightLabel}</Ed>
      </div>
    </div>
  );
}
