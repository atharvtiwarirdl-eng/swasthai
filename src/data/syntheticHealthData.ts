import {
  type ConstellationNode,
  type InsightItem,
  type NotificationItem,
  type ReportItem,
  type TimelineEvent,
  type VitalPoint,
} from "../types/health";

export const constellationNodes: ConstellationNode[] = [
  {
    id: "vitals",
    label: "Vitals",
    x: 48,
    y: 18,
    value: 82,
    trend: 4,
    status: "stable",
    summary: "Heart and blood-pressure ranges remain consistent.",
  },
  {
    id: "reports",
    label: "Reports",
    x: 81,
    y: 34,
    value: 74,
    trend: 1,
    status: "watch",
    summary: "Latest lipid panel needs mild dietary follow-up.",
  },
  {
    id: "symptoms",
    label: "Symptoms",
    x: 77,
    y: 74,
    value: 61,
    trend: -3,
    status: "attention",
    summary: "Evening headaches increased over the last 10 days.",
  },
  {
    id: "sleep",
    label: "Sleep",
    x: 49,
    y: 83,
    value: 69,
    trend: 5,
    status: "watch",
    summary: "Sleep duration improved, but deep-sleep still irregular.",
  },
  {
    id: "activity",
    label: "Activity",
    x: 21,
    y: 70,
    value: 78,
    trend: 6,
    status: "stable",
    summary: "Weekly movement target reached 5 of 7 days.",
  },
  {
    id: "appointments",
    label: "Appointments",
    x: 16,
    y: 33,
    value: 87,
    trend: 2,
    status: "stable",
    summary: "Follow-up cadence aligned with current care plan.",
  },
];

export const vitalSeries: VitalPoint[] = [
  { day: "Mon", heartRate: 72, sleepHours: 6.8, stress: 39 },
  { day: "Tue", heartRate: 74, sleepHours: 6.5, stress: 44 },
  { day: "Wed", heartRate: 71, sleepHours: 7.2, stress: 35 },
  { day: "Thu", heartRate: 75, sleepHours: 6.9, stress: 48 },
  { day: "Fri", heartRate: 73, sleepHours: 7.4, stress: 33 },
  { day: "Sat", heartRate: 70, sleepHours: 7.6, stress: 30 },
  { day: "Sun", heartRate: 72, sleepHours: 7.1, stress: 37 },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: "tl-1",
    date: "2026-09-18 08:15",
    kind: "vitals",
    title: "Resting heart rate normalized",
    detail: "7-day average returned to baseline after hydration protocol.",
    score: 83,
  },
  {
    id: "tl-2",
    date: "2026-09-17 20:40",
    kind: "symptoms",
    title: "Headache entry recorded",
    detail: "Mild frontal headache, duration 35 min, resolved without medication.",
    score: 58,
  },
  {
    id: "tl-3",
    date: "2026-09-16 14:05",
    kind: "reports",
    title: "Blood panel uploaded",
    detail: "Ferritin and B12 in-range; LDL slightly elevated against personal threshold.",
    score: 71,
  },
  {
    id: "tl-4",
    date: "2026-09-15 09:30",
    kind: "appointments",
    title: "Teleconsultation completed",
    detail: "Physician advised magnesium adjustment and stress-loading checks.",
    score: 79,
  },
  {
    id: "tl-5",
    date: "2026-09-14 22:10",
    kind: "medications",
    title: "Medication adherence 100%",
    detail: "All scheduled doses logged on time for previous 7-day cycle.",
    score: 90,
  },
  {
    id: "tl-6",
    date: "2026-09-14 07:20",
    kind: "insights",
    title: "AI pattern: Sleep-symptom coupling",
    detail: "Low deep-sleep nights correlate with higher morning symptom notes.",
    score: 76,
  },
];

export const reports: ReportItem[] = [
  {
    id: "rp-1",
    date: "2026-09-16",
    type: "Comprehensive Blood Panel",
    summary: "LDL marginally elevated, inflammatory markers normal.",
    status: "review",
  },
  {
    id: "rp-2",
    date: "2026-08-27",
    type: "Sleep Study Summary",
    summary: "Sleep efficiency improved to 88% with reduced awakenings.",
    status: "normal",
  },
  {
    id: "rp-3",
    date: "2026-08-12",
    type: "ECG Snapshot",
    summary: "No arrhythmia pattern detected in 14-day monitor window.",
    status: "normal",
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "nt-1",
    title: "Medication window",
    message: "Vitamin D dose due in 45 minutes.",
    time: "Today 08:15",
    priority: "medium",
  },
  {
    id: "nt-2",
    title: "New insight generated",
    message: "Stress spike likely linked to reduced sleep continuity.",
    time: "Today 07:20",
    priority: "high",
  },
  {
    id: "nt-3",
    title: "Report follow-up",
    message: "Nutrition check-in suggested after lipid panel review.",
    time: "Yesterday 16:40",
    priority: "low",
  },
];

export const aiInsights: InsightItem[] = [
  {
    id: "ai-1",
    headline: "Recovery trend improving",
    detail: "Lower stress and better sleep depth indicate improved recovery quality.",
    confidence: 87,
  },
  {
    id: "ai-2",
    headline: "Symptom trigger pattern",
    detail: "Headache logs increase on days with hydration below 1.8L.",
    confidence: 79,
  },
];

export const metricHighlights = [
  { label: "Health Index", value: "78", delta: "+4.2% this month" },
  { label: "Sleep Consistency", value: "84%", delta: "+6 days above target" },
  { label: "Adherence", value: "96%", delta: "0 missed doses this week" },
];