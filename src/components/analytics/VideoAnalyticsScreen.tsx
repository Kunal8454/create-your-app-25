import { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle, DualBar, Ed, ProgressList } from "./primitives";
import type { BarItem } from "./primitives";
import { MetricChart } from "./MetricChart";
import { GenderGauge } from "./GenderGauge";
import {
  ageData,
  headerStats,
  hourLabels,
  locationsData,
  metrics,
  searchData,
  tabs,
  trafficData,
} from "./data";

function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const loaded = useRef(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`tt-state:${key}`);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    loaded.current = true;
  }, [key]);
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(`tt-state:${key}`, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

export function VideoAnalyticsScreen() {
  const [editMode, setEditMode] = useState(false);
  const [tab, setTab] = usePersisted("tab", 1);
  const [metricIdx, setMetricIdx] = useState(0);
  const [thumb, setThumb] = usePersisted<string | null>("thumb", "/video-thumb.jpg");
  const [toast, setToast] = useState<string | null>(null);
  const [locations, setLocations] = usePersisted<BarItem[]>("locations", locationsData);
  const [newCountry, setNewCountry] = useState("");
  const [newPercentage, setNewPercentage] = useState("");
  const [retentionPoint, setRetentionPoint] = usePersisted("retentionPoint", 79);
  const [likesPoint, setLikesPoint] = usePersisted("likesPoint", 0);
  const [likesThumb] = usePersisted<string | null>("likesThumb", "/likes-thumb.jpg");
  const fileRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  };

  const toggleEdit = () => {
    const next = !editMode;
    setEditMode(next);
    showToast(next ? "✏️ Edit Mode ON: Click any text or number to edit" : "🔒 Edit Mode OFF: Dashboard locked");
  };

  const pickThumb = () => {
    if (!editMode) {
      showToast("ℹ️ Tap 'Video an...' at top to enable Edit Mode");
      return;
    }
    fileRef.current?.click();
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setThumb(String(ev.target?.result ?? ""));
    reader.readAsDataURL(file);
  };

  const metric = metrics[metricIdx]!;

  const addCountry = () => {
    const label = newCountry.trim();
    const pct = Math.min(Math.max(Number.parseFloat(newPercentage) || 0, 0), 100);
    if (!label) {
      showToast("Country name डालें");
      return;
    }
    if (locations.length >= 5) {
      showToast("अधिकतम 5 countries रख सकते हैं");
      return;
    }
    setLocations((current) => [...current, { label, pct, pctStr: `${pct}%` }]);
    setNewCountry("");
    setNewPercentage("");
    showToast(`${label} add हो गया`);
  };

  const removeCountry = (index: number) => {
    const removed = locations[index];
    setLocations((current) => current.filter((_, itemIndex) => itemIndex !== index));
    showToast(`${removed?.label ?? "Country"} delete हो गया`);
  };

  return (
    <div className="tt-page">
      <div className={`tt-frame${editMode ? " tt-edit-active" : ""}`}>
        <div className="tt-top-bar">
          <div className="tt-top-left">
            <svg className="tt-back" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>
          <div className="tt-top-title" onClick={toggleEdit} title="Click to toggle Edit Mode">
            Video an...
          </div>
          <div className="tt-studio-pill">
            <svg className="tt-studio-icon" viewBox="0 0 24 24">
              <circle cx="8" cy="8" r="3.2" />
              <path d="M2.5 17.5c0-2.3 3-3.5 5.5-3.5s5.5 1.2 5.5 3.5v.8H2.5v-.8z" />
              <polygon points="17.5,4 18.3,5.8 20.3,6.1 18.8,7.5 19.2,9.5 17.5,8.5 15.8,9.5 16.2,7.5 14.7,6.1 16.7,5.8" />
            </svg>
            <Ed editable={editMode}>TikTok Studio</Ed>
          </div>
        </div>

        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={onFile} />

        <div className="tt-video-header">
          <div className="tt-thumb-box" onClick={pickThumb} title="Click to upload custom thumbnail image">
            {thumb ? (
              <img src={thumb} alt="Video thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <span style={{ fontSize: 24 }}>📷</span>
                <span style={{ fontSize: 9.5, color: "#8e8e93" }}>Set Image</span>
              </div>
            )}
            <div className="tt-thumb-badge" onClick={(e) => e.stopPropagation()}>
              <Ed editable={editMode}>11.53s</Ed>
            </div>
          </div>
          <Ed className="tt-post-date" editable={editMode}>
            Posted on Aug 28, 2026, 10:41 PM
          </Ed>

          <div className="tt-stats-row">
            {headerStats.map((s) => (
              <div key={s.id} className="tt-stat-col">
                <svg className="tt-stat-svg" viewBox="0 0 24 24">
                  <path d={s.path} fill="#6f7176" />
                  {s.id === "comments" ? (
                    <>
                      <circle cx="8" cy="12" r="1.15" fill="#000" />
                      <circle cx="12" cy="12" r="1.15" fill="#000" />
                      <circle cx="16" cy="12" r="1.15" fill="#000" />
                    </>
                  ) : null}
                </svg>
                <Ed className="tt-stat-num" editable={editMode}>
                  {s.value}
                </Ed>
              </div>
            ))}
          </div>
        </div>

        <div className="tt-tabs-bar">
          {tabs.map((t, i) => (
            <div
              key={t}
              className={`tt-tab-item${tab === i ? " active" : ""}`}
              onClick={() => setTab(i)}
            >
              {t}
            </div>
          ))}
        </div>

        <div className="tt-content">
          {tab === 0 ? (
            <Card style={{ textAlign: "center", padding: "40px 20px" }}>
              <Ed style={{ color: "#7c828c" }} editable={editMode}>
                Inspiration insights will appear here.
              </Ed>
            </Card>
          ) : null}

          {tab === 1 ? (
            <>
              <Card>
                <CardTitle title="Key metrics" editable={editMode} />
                <Ed className="tt-card-subtext" editable={editMode}>
                  Updated in real time.
                </Ed>
                <div className="tt-km-grid">
                  {metrics.map((m, i) => (
                    <div
                      key={m.name}
                      className={`tt-km-box${metricIdx === i ? " active" : ""}`}
                      onClick={() => setMetricIdx(i)}
                    >
                      <Ed className="tt-km-label" editable={editMode}>
                        {m.name}
                      </Ed>
                      <Ed className="tt-km-val" editable={editMode}>
                        {m.value}
                      </Ed>
                    </div>
                  ))}
                </div>
                <MetricChart key={metric.name} metric={metric} labels={hourLabels} editable={editMode} />
              </Card>

              <Card>
                <CardTitle title="Retention rate" editable={editMode} />
                <Ed style={{ fontSize: 13.5, fontWeight: 600, display: "block", marginTop: 4 }} editable={editMode}>
                  On average, viewers watched 29% of your video.
                </Ed>
                <Ed className="tt-card-subtext" style={{ marginTop: 4 }} editable={editMode}>
                  Most viewers stopped watching at 0:01. Check out the moment in your video where most viewers lost
                  interest.
                </Ed>
                <RetentionPreview
                  thumb={thumb}
                  onClick={pickThumb}
                  value={retentionPoint}
                  onChange={setRetentionPoint}
                  editable={editMode}
                />
              </Card>

              <Card>
                <CardTitle title="Traffic sources" editable={editMode} />
                <ProgressList data={trafficData} editable={editMode} />
              </Card>

              <Card>
                <CardTitle title="Search queries" editable={editMode} />
                <ProgressList data={searchData} editable={editMode} />
              </Card>

              <Card style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <Ed style={{ fontWeight: 700, fontSize: 14, display: "block" }} editable={editMode}>
                      Want more traffic?
                    </Ed>
                    <Ed style={{ color: "#8e8e93", fontSize: 12, display: "block", marginTop: 2 }} editable={editMode}>
                      Use Promote to grow your audience.
                    </Ed>
                  </div>
                  <span style={{ color: "#8e8e93", fontSize: 16 }}>&gt;</span>
                </div>
              </Card>

              <Card style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Ed style={{ fontWeight: 700, fontSize: 14 }} editable={editMode}>
                    View data for other posts
                  </Ed>
                  <div style={{ width: 28, height: 28, background: "#222226", borderRadius: 4 }} />
                </div>
              </Card>
            </>
          ) : null}

          {tab === 2 ? (
            <>
              <Card>
                <CardTitle title="Total viewers" editable={editMode} />
                <Ed style={{ fontSize: 28, fontWeight: 700, display: "block", margin: "4px 0" }} editable={editMode}>
                  249
                </Ed>
                <Ed style={{ fontSize: 12.5, color: "#8e8e93" }} editable={editMode}>
                  +0 (vs 1d ago)
                </Ed>
              </Card>

              <Card>
                <CardTitle title="Viewer types" editable={editMode} />
                <DualBar
                  leftPct="92%"
                  rightPct="8%"
                  leftLabel="New viewers"
                  rightLabel="Returning viewers"
                  editable={editMode}
                />
                <DualBar
                  leftPct="97%"
                  rightPct="3%"
                  leftLabel="Non-followers"
                  rightLabel="Followers"
                  editable={editMode}
                />
              </Card>

              <Card>
                <CardTitle title="Gender" info={false} editable={editMode} />
                <GenderGauge editable={editMode} />
              </Card>

              <Card>
                <CardTitle title="Age" info={false} editable={editMode} />
                <ProgressList data={ageData} editable={editMode} />
              </Card>

              <Card>
                <CardTitle title="Locations" editable={editMode} />
                <div className="tt-location-list">
                  {locations.map((item, index) => (
                    <div className="tt-location-item" style={editMode ? undefined : { paddingRight: 0 }} key={`${item.label}-${index}`}>
                      <ProgressList data={[item]} editable={editMode} />
                      {editMode && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="tt-location-delete"
                          aria-label={`Delete ${item.label}`}
                          title={`Delete ${item.label}`}
                          onClick={() => removeCountry(index)}
                        >
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                {!editMode ? null : locations.length < 5 ? (
                  <div className="tt-location-add">
                    <Input
                      value={newCountry}
                      onChange={(event) => setNewCountry(event.target.value)}
                      placeholder="Country"
                      aria-label="Country name"
                    />
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={newPercentage}
                      onChange={(event) => setNewPercentage(event.target.value)}
                      placeholder="%"
                      aria-label="Percentage"
                    />
                    <Button type="button" size="icon" onClick={addCountry} aria-label="Add country" title="Add country">
                      <Plus />
                    </Button>
                  </div>
                ) : (
                  <div className="tt-location-limit">5 countries added</div>
                )}
              </Card>
            </>
          ) : null}

          {tab === 3 ? (
            <>
              <Card>
                <CardTitle title="Top words used in comments" editable={editMode} />
                <Ed className="tt-card-subtext" style={{ marginTop: 6 }} editable={editMode}>
                  Top word insights are not ready yet. Please check back later.
                </Ed>
              </Card>
              <Card>
                <CardTitle title="Likes" editable={editMode} />
                <Ed className="tt-card-subtext" style={{ marginTop: 6 }} editable={editMode}>
                  Most viewers liked this video at 0:00. Check out the moment where most viewers liked your video.
                </Ed>
                <LikesPreview
                  thumb={likesThumb}
                  onClick={pickThumb}
                  value={likesPoint}
                  onChange={setLikesPoint}
                  editable={editMode}
                />
              </Card>
            </>
          ) : null}
        </div>
      </div>

      <div className={`tt-toast${toast ? " show" : ""}`}>{toast}</div>
    </div>
  );
}

function VideoPreview({ thumb, onClick }: { thumb: string | null; onClick: () => void }) {
  return (
    <div className="tt-video-preview" onClick={onClick} title="Click to upload video thumbnail">
      {thumb ? (
        <img
          src={thumb}
          alt="Video preview"
          style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
        />
      ) : null}
      <div className="tt-play-btn">▶</div>
    </div>
  );
}

const LIKES_DEFAULT = [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function LikesPreview({
  thumb,
  onClick,
  value,
  onChange,
  editable,
}: {
  thumb: string | null;
  onClick: () => void;
  value: number;
  onChange: (value: number) => void;
  editable: boolean;
}) {
  const currentProgress = value / 100;
  const seconds = Math.round(currentProgress * 24);
  const [pts, setPts] = useState<number[]>(LIKES_DEFAULT);
  const plotRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tt-state:likesCurve");
      if (raw) setPts(JSON.parse(raw) as number[]);
    } catch {
      /* ignore */
    }
  }, []);
  const editAt = (clientX: number, clientY: number) => {
    const el = plotRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const fx = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
    const yv = ((clientY - r.top) / r.height) * 100;
    const pct = Math.round(Math.min(Math.max(((94 - yv) / 84) * 100, 0), 100));
    const idx = Math.round(fx * (pts.length - 1));
    setPts((prev) => {
      const next = prev.map((v, i) => (i === idx ? pct : v));
      try {
        localStorage.setItem("tt-state:likesCurve", JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };
  const yOf = (v: number) => 94 - (v / 100) * 84;
  const xOf = (i: number) => (i / (pts.length - 1)) * 1000;
  const fi = currentProgress * (pts.length - 1);
  const i0 = Math.floor(fi);
  const i1 = Math.min(i0 + 1, pts.length - 1);
  const currentPct = Math.round(pts[i0]! + (pts[i1]! - pts[i0]!) * (fi - i0));
  const curveD = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");
  const areaD = `${curveD} L 1000,94 L 0,94 Z`;

  const markerX = Number((currentProgress * 1000).toFixed(1));
  const markerY = Number((94 - (currentPct / 100) * 84).toFixed(1));

  return (
    <div className="tt-retention">
      <div className="tt-retention-video" onClick={onClick} title="Click to upload video thumbnail">
        {thumb ? (
          <img src={thumb} alt="Likes video preview" />
        ) : (
          <span className="tt-retention-placeholder">Set video image</span>
        )}
        {thumb === "/likes-thumb.jpg" ? null : <span className="tt-retention-play">▶</span>}
      </div>

      <div className="tt-retention-chart-row">
        <div
          className="tt-retention-plot"
          ref={plotRef}
          style={editable ? { touchAction: "none", cursor: "crosshair" } : undefined}
          onPointerDown={(e) => {
            if (!editable) return;
            dragging.current = true;
            editAt(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (editable && dragging.current) editAt(e.clientX, e.clientY);
          }}
          onPointerUp={() => (dragging.current = false)}
          onPointerLeave={() => (dragging.current = false)}
        >
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="likesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ba1ff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4ba1ff" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <line x1="0" y1="10" x2="1000" y2="10" className="tt-retention-grid" />
            <line x1="0" y1="52" x2="1000" y2="52" className="tt-retention-grid" />
            <line x1="0" y1="94" x2="1000" y2="94" className="tt-retention-base" />

            <path d={areaD} fill="url(#likesGrad)" />
            <path d={curveD} className="tt-retention-line" />

            <line x1={markerX} y1="10" x2={markerX} y2="94" className="tt-retention-marker-line" />
          </svg>
          {editable
            ? pts.map((v, i) => (
                <div
                  key={i}
                  className="tt-retention-marker-dot"
                  style={{ left: `${(i / (pts.length - 1)) * 100}%`, top: `${yOf(v)}%`, width: 6, height: 6, background: "#fff", border: "1px solid #55aaff" }}
                />
              ))
            : null}
          <div
            className="tt-retention-marker-dot"
            style={{
              left: `${currentProgress * 100}%`,
              top: `${(markerY / 100) * 100}%`,
            }}
          />
        </div>

        <div className="tt-retention-labels">
          <div className="tt-ret-lbl-item" style={{ top: "10%" }}>
            <span className="tt-ret-lbl-dash" />
            <span className="tt-ret-lbl-text">100%</span>
          </div>
          <div className="tt-ret-lbl-item" style={{ top: "52%" }}>
            <span className="tt-ret-lbl-dash" />
            <span className="tt-ret-lbl-text">50%</span>
          </div>
        </div>
      </div>

      <div className="tt-retention-slider-row">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          className="tt-retention-range"
          style={{ "--retention-progress": `${value}%` } as React.CSSProperties}
          aria-label="Likes timeline"
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>

      <div className="tt-retention-times-row">
        <Ed editable={editable}>{`00:${String(seconds).padStart(2, "0")} (${currentPct}%)`}</Ed>
        <Ed editable={editable}>00:24</Ed>
      </div>
    </div>
  );
}

const RETENTION_POINTS: [number, number][] = [
  [0.0, 100.0],
  [0.01, 85.0],
  [0.02, 68.0],
  [0.035, 47.0],
  [0.06, 33.0],
  [0.09, 27.0],
  [0.14, 20.6],
  [0.2, 16.5],
  [0.33, 12.9],
  [0.46, 10.0],
  [0.6, 8.2],
  [0.73, 7.1],
  [0.792, 6.0],
  [0.86, 5.5],
  [1.0, 4.5],
];

function getRetention(progress: number): number {
  if (progress <= 0) return 100;
  if (progress >= 1) return 5;
  for (let i = 0; i < RETENTION_POINTS.length - 1; i++) {
    const [t0, r0] = RETENTION_POINTS[i]!;
    const [t1, r1] = RETENTION_POINTS[i + 1]!;
    if (progress >= t0 && progress <= t1) {
      const ratio = (progress - t0) / (t1 - t0);
      const smooth = (1 - Math.cos(ratio * Math.PI)) / 2;
      return Math.round(r0 + (r1 - r0) * smooth);
    }
  }
  return 5;
}

function RetentionPreview({
  thumb,
  onClick,
  value,
  onChange,
  editable,
}: {
  thumb: string | null;
  onClick: () => void;
  value: number;
  onChange: (value: number) => void;
  editable: boolean;
}) {
  const currentProgress = value / 100;
  const seconds = Math.round(currentProgress * 24);
  const currentRetention = getRetention(currentProgress);

  // SVG dimensions: viewBox="0 0 1000 100"
  // yTop = 10 (100%), yMid = 52 (50%), yBottom = 94 (0%)
  const steps = 100;
  const curvePts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const p = i / steps;
    const x = Number((p * 1000).toFixed(1));
    const r = getRetention(p);
    const y = Number((94 - (r / 100) * 84).toFixed(1));
    curvePts.push([x, y]);
  }
  const curveD = curvePts.reduce((acc, [x, y], idx) => (idx === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`), "");
  const areaD = `${curveD} L 1000,94 L 0,94 Z`;

  const markerX = Number((currentProgress * 1000).toFixed(1));
  const markerY = Number((94 - (currentRetention / 100) * 84).toFixed(1));

  return (
    <div className="tt-retention">
      <div className="tt-retention-video" onClick={onClick} title="Click to upload video thumbnail">
        {thumb ? (
          <img src={thumb} alt="Video preview" />
        ) : (
          <span className="tt-retention-placeholder">Set video image</span>
        )}
        {thumb === "/video-thumb.jpg" ? null : <span className="tt-retention-play">▶</span>}
      </div>

      <div className="tt-retention-chart-row">
        <div className="tt-retention-plot">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ba1ff" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#4ba1ff" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <line x1="0" y1="10" x2="1000" y2="10" className="tt-retention-grid" />
            <line x1="0" y1="52" x2="1000" y2="52" className="tt-retention-grid" />
            <line x1="0" y1="94" x2="1000" y2="94" className="tt-retention-base" />

            <path d={areaD} fill="url(#retentionGrad)" />
            <path d={curveD} className="tt-retention-line" />

            <line x1={markerX} y1="10" x2={markerX} y2="94" className="tt-retention-marker-line" />
            {/* SVG circle replaced by HTML dot below */}
          </svg>
          <div
            className="tt-retention-marker-dot"
            style={{
              left: `${currentProgress * 100}%`,
              top: `${(markerY / 100) * 100}%`,
            }}
          />
        </div>

        <div className="tt-retention-labels">
          <div className="tt-ret-lbl-item" style={{ top: "10%" }}>
            <span className="tt-ret-lbl-dash" />
            <span className="tt-ret-lbl-text">100%</span>
          </div>
          <div className="tt-ret-lbl-item" style={{ top: "52%" }}>
            <span className="tt-ret-lbl-dash" />
            <span className="tt-ret-lbl-text">50%</span>
          </div>
        </div>
      </div>

      <div className="tt-retention-slider-row">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          className="tt-retention-range"
          style={{ "--retention-progress": `${value}%` } as React.CSSProperties}
          aria-label="Video retention timeline"
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>

      <div className="tt-retention-times-row">
        <Ed editable={editable}>{`00:${String(seconds).padStart(2, "0")} (${currentRetention}%)`}</Ed>
        <Ed editable={editable}>00:24</Ed>
      </div>
    </div>
  );
}
