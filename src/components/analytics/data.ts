import type { BarItem } from "./primitives";
import type { Metric } from "./MetricChart";

export const metrics: Metric[] = [
  {
    name: "Video views",
    value: "7.3K",
    max: "8.9K",
    mid: "5.9K",
    low: "3.0K",
    points: [15, 20, 60, 7100, 1450, 180, 70, 50, 35, 25, 18, 15, 10],
  },
  {
    name: "Total play time",
    value: "2h:25m:25s",
    max: "3.0h",
    mid: "2.0h",
    low: "1.0h",
    points: [5, 10, 40, 2200, 600, 80, 30, 20, 15, 10, 8, 6, 4],
  },
  {
    name: "Average watch time",
    value: "0.9s",
    max: "2.0s",
    mid: "1.0s",
    low: "0.5s",
    points: [0.8, 0.9, 0.9, 1.2, 0.9, 0.8, 0.8, 0.7, 0.8, 0.9, 0.8, 0.9, 0.8],
  },
  {
    name: "Watched full video",
    value: "0.25%",
    max: "1.0%",
    mid: "0.5%",
    low: "0.2%",
    points: [0.2, 0.2, 0.3, 0.8, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.2, 0.25, 0.1],
  },
  {
    name: "New followers",
    value: "0",
    max: "3",
    mid: "2",
    low: "1",
    points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
];

export const hourLabels = ["0h", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h"];

export const trafficData: BarItem[] = [
  { label: "Personal profile", pct: 62.4, pctStr: "62.4%" },
  { label: "For You", pct: 26.8, pctStr: "26.8%" },
  { label: "Search", pct: 10.8, pctStr: "10.8%" },
  { label: "Other", pct: 0, pctStr: "0.0%" },
  { label: "Sound", pct: 0, pctStr: "0.0%" },
  { label: "Following", pct: 0, pctStr: "0.0%" },
];

export const searchData: BarItem[] = [
  { label: "call of duty", pct: 8.6, pctStr: "8.6%" },
  { label: "MW4 beta", pct: 8.6, pctStr: "8.6%" },
  { label: "Call of Duty: Modern Warfare 4", pct: 6.2, pctStr: "6.2%" },
  { label: "modern warfare 4", pct: 4.9, pctStr: "4.9%" },
  { label: "call of duty modren warfar4", pct: 3.7, pctStr: "3.7%" },
];

export const ageData: BarItem[] = [
  { label: "18 - 24", pct: 71, pctStr: "71%" },
  { label: "25 - 34", pct: 23, pctStr: "23%" },
  { label: "35 - 44", pct: 5, pctStr: "5%" },
  { label: "45 - 54", pct: 1, pctStr: "1%" },
  { label: "55+", pct: 0, pctStr: "0%" },
];

export const locationsData: BarItem[] = [
  { label: "Pakistan", pct: 64.8, pctStr: "64.8%" },
  { label: "France", pct: 5.0, pctStr: "5.0%" },
  { label: "South Africa", pct: 4.8, pctStr: "4.8%" },
  { label: "United Kingdom", pct: 4.3, pctStr: "4.3%" },
  { label: "United States", pct: 3.2, pctStr: "3.2%", arrow: true },
  { label: "Germany", pct: 3.1, pctStr: "3.1%" },
  { label: "Saudi Arabia", pct: 1.5, pctStr: "1.5%" },
  { label: "Spain", pct: 1.4, pctStr: "1.4%", arrow: true },
  { label: "Poland", pct: 1.4, pctStr: "1.4%" },
  { label: "Iraq", pct: 1.2, pctStr: "1.2%" },
  { label: "Other", pct: 9.3, pctStr: "9.3%", arrow: true },
];

export const headerStats = [
  { id: "views", value: "791", path: "M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" },
  {
    id: "likes",
    value: "87",
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  },
  {
    id: "comments",
    value: "9",
    path: "M12 3C6.48 3 2 7.03 2 12c0 2.25 1.02 4.3 2.72 5.82L3.5 21.5l4.35-1.45C9.28 20.65 10.6 21 12 21c5.52 0 10-4.03 10-9s-4.48-9-10-9z",
  },
  { id: "shares", value: "24", path: "M14 5v3.9C6.5 9.9 3.5 15.2 2.5 20.5 5.2 16.8 9 15.1 14 15.1V19l8-7-8-7z" },
  { id: "saves", value: "29", path: "M17 3H7c-1.1 0-2 .9-2 2v16l7-4.5 7 4.5V5c0-1.1-.9-2-2-2z" },
];

export const tabs = ["Inspiration", "Overview", "Viewers", "Engagement"];
