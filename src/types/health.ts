export type HealthDomain =
  | "vitals"
  | "reports"
  | "symptoms"
  | "sleep"
  | "activity"
  | "appointments";

export type HealthStatus = "stable" | "watch" | "attention";

export type ConstellationNode = {
  id: HealthDomain;
  label: string;
  x: number;
  y: number;
  value: number;
  trend: number;
  status: HealthStatus;
  summary: string;
};

export type VitalPoint = {
  day: string;
  heartRate: number;
  sleepHours: number;
  stress: number;
};

export type TimelineKind =
  | "vitals"
  | "reports"
  | "symptoms"
  | "appointments"
  | "medications"
  | "insights";

export type TimelineEvent = {
  id: string;
  date: string;
  kind: TimelineKind;
  title: string;
  detail: string;
  score: number;
};

export type ReportItem = {
  id: string;
  date: string;
  type: string;
  summary: string;
  status: "normal" | "review";
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  priority: "low" | "medium" | "high";
};

export type InsightItem = {
  id: string;
  headline: string;
  detail: string;
  confidence: number;
};