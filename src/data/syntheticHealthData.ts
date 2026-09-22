import {
  type ActivityRecord,
  type Appointment,
  type AppNotification,
  type ConstellationNode,
  type ConstellationRelationship,
  type HealthMetric,
  type HealthReport,
  type InsightItem,
  type Medication,
  type NotificationItem,
  type ReportItem,
  type SleepRecord,
  type SymptomEvent,
  type TimelineEvent,
  type User,
  type Vital,
  type VitalPoint,
} from "../types/health";

export const syntheticUser: User = {
  id: "usr-001",
  fullName: "Saanvi Patel",
  age: 34,
  gender: "Female",
  location: "Pune, India",
  memberSince: "2026-02-11",
  emergencyContact: { name: "Rohan Patel", relation: "Spouse", phone: "+91-98XXX-XX214" },
  preferences: { language: "English", timeFormat: "24h", reducedMotion: false },
  notificationSettings: { appointments: true, reports: true, medication: true, insights: true },
};

export const healthMetrics: HealthMetric[] = [
  { id: "hm-1", label: "Health Index", value: "81", delta: "+3.1% this month", status: "stable" },
  { id: "hm-2", label: "Sleep Consistency", value: "86%", delta: "+5 nights on target", status: "watch" },
  { id: "hm-3", label: "Medication Adherence", value: "96%", delta: "1 late dose this week", status: "stable" },
];

export const vitals: Vital[] = [
  { timestamp: "2026-09-20T06:30:00", heartRate: 71, systolicBP: 118, diastolicBP: 76, spo2: 98, temperature: 98.4, respiratoryRate: 15 },
  { timestamp: "2026-09-19T06:30:00", heartRate: 73, systolicBP: 121, diastolicBP: 77, spo2: 98, temperature: 98.3, respiratoryRate: 16 },
  { timestamp: "2026-09-18T06:30:00", heartRate: 74, systolicBP: 122, diastolicBP: 79, spo2: 97, temperature: 98.6, respiratoryRate: 16 },
  { timestamp: "2026-09-17T06:30:00", heartRate: 72, systolicBP: 119, diastolicBP: 77, spo2: 98, temperature: 98.4, respiratoryRate: 15 },
  { timestamp: "2026-09-16T06:30:00", heartRate: 70, systolicBP: 117, diastolicBP: 75, spo2: 99, temperature: 98.2, respiratoryRate: 15 },
  { timestamp: "2026-09-15T06:30:00", heartRate: 73, systolicBP: 120, diastolicBP: 78, spo2: 98, temperature: 98.5, respiratoryRate: 16 },
  { timestamp: "2026-09-14T06:30:00", heartRate: 75, systolicBP: 123, diastolicBP: 80, spo2: 97, temperature: 98.7, respiratoryRate: 17 },
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

export const sleepRecords: SleepRecord[] = [
  { id: "sl-1", date: "2026-09-19", durationHours: 7.2, deepSleepHours: 1.8, sleepScore: 86 },
  { id: "sl-2", date: "2026-09-18", durationHours: 6.9, deepSleepHours: 1.5, sleepScore: 79 },
  { id: "sl-3", date: "2026-09-17", durationHours: 6.4, deepSleepHours: 1.2, sleepScore: 72 },
  { id: "sl-4", date: "2026-09-16", durationHours: 7.6, deepSleepHours: 2.1, sleepScore: 89 },
];

export const activityRecords: ActivityRecord[] = [
  { id: "ac-1", date: "2026-09-19", steps: 9340, activeMinutes: 48, caloriesBurned: 420 },
  { id: "ac-2", date: "2026-09-18", steps: 7820, activeMinutes: 36, caloriesBurned: 355 },
  { id: "ac-3", date: "2026-09-17", steps: 10110, activeMinutes: 62, caloriesBurned: 480 },
  { id: "ac-4", date: "2026-09-16", steps: 6640, activeMinutes: 31, caloriesBurned: 300 },
];

export const symptomEvents: SymptomEvent[] = [
  { id: "sy-1", date: "2026-09-19T20:35:00", symptom: "Headache", intensity: 4, note: "Post-work mild headache, hydration helped.", resolved: true },
  { id: "sy-2", date: "2026-09-17T07:50:00", symptom: "Fatigue", intensity: 5, note: "Low energy after short sleep night.", resolved: true },
  { id: "sy-3", date: "2026-09-14T21:10:00", symptom: "Neck stiffness", intensity: 3, note: "Resolved after stretching.", resolved: true },
];

export const reportsData: HealthReport[] = [
  {
    id: "rp-1",
    name: "Comprehensive Blood Panel",
    category: "Blood Test",
    date: "2026-09-16",
    status: "review",
    summary: "Lipid values slightly above personal target; inflammatory markers in-range.",
    keyValues: [
      { label: "LDL", value: "126 mg/dL", reference: "Goal < 110" },
      { label: "CRP", value: "1.2 mg/L", reference: "Normal < 3.0" },
      { label: "Ferritin", value: "62 ng/mL", reference: "Normal 15-150" },
    ],
    relatedTimelineIds: ["tl-3", "tl-4"],
  },
  {
    id: "rp-2",
    name: "Sleep Study Summary",
    category: "Preventive Health",
    date: "2026-08-27",
    status: "normal",
    summary: "Sleep efficiency improving with fewer interruptions.",
    keyValues: [
      { label: "Sleep Efficiency", value: "88%", reference: "Target > 85%" },
      { label: "Awakenings", value: "2/night", reference: "Typical 1-3" },
    ],
    relatedTimelineIds: ["tl-9"],
  },
  {
    id: "rp-3",
    name: "Cardiology Check Snapshot",
    category: "Cardiology",
    date: "2026-08-12",
    status: "normal",
    summary: "No sustained rhythm irregularity in observation period.",
    keyValues: [
      { label: "Average Resting HR", value: "72 bpm", reference: "Target 60-80" },
      { label: "Arrhythmia Episodes", value: "None sustained", reference: "N/A" },
    ],
    relatedTimelineIds: ["tl-11"],
  },
];

export const appointments: Appointment[] = [
  { id: "ap-1", doctorName: "Dr. A. Mehta", specialty: "Internal Medicine", date: "2026-09-22", time: "09:30", appointmentType: "Teleconsultation", status: "upcoming", location: "SwasthAI Virtual Clinic" },
  { id: "ap-2", doctorName: "Dr. R. Kulkarni", specialty: "Cardiology", date: "2026-10-05", time: "11:00", appointmentType: "In-person", status: "upcoming", location: "Riverside Heart Center" },
  { id: "ap-3", doctorName: "Dr. A. Mehta", specialty: "Internal Medicine", date: "2026-09-15", time: "09:30", appointmentType: "Teleconsultation", status: "completed", location: "SwasthAI Virtual Clinic" },
];

export const medications: Medication[] = [
  { id: "md-1", name: "Vitamin D3", dosage: "1000 IU", schedule: "Daily 08:00", startDate: "2026-07-05", status: "active" },
  { id: "md-2", name: "Magnesium Glycinate", dosage: "200 mg", schedule: "Daily 21:00", startDate: "2026-08-20", status: "active" },
  { id: "md-3", name: "Omega-3", dosage: "1 capsule", schedule: "Daily 13:00", startDate: "2026-05-10", status: "active" },
];

export const appNotifications: AppNotification[] = [
  { id: "nt-1", type: "medication", title: "Medication reminder", message: "Magnesium dose due in 40 minutes.", timestamp: "2026-09-20 20:20", read: false, priority: "medium" },
  { id: "nt-2", type: "appointment", title: "Upcoming appointment", message: "Teleconsultation with Dr. Mehta tomorrow at 09:30.", timestamp: "2026-09-20 09:10", read: false, priority: "high" },
  { id: "nt-3", type: "report", title: "Report review available", message: "Blood panel summary updated in reports.", timestamp: "2026-09-19 16:30", read: true, priority: "low" },
  { id: "nt-4", type: "health-event", title: "Sleep-pattern signal", message: "Lower deep sleep linked with next-day fatigue in recent records.", timestamp: "2026-09-19 07:20", read: true, priority: "medium" },
];

export const aiInsights: InsightItem[] = [
  {
    id: "ai-1",
    headline: "Recovery trend improving",
    detail: "Lower stress and better sleep depth indicate improved recovery quality over 2 weeks.",
    confidence: 87,
  },
  {
    id: "ai-2",
    headline: "Symptom trigger pattern",
    detail: "Headache logs increase on days with hydration below 1.8L and sleep below 6.8 hours.",
    confidence: 79,
  },
];

export const constellationNodes: ConstellationNode[] = [
  { id: "vitals", label: "Vitals", x: 48, y: 18, value: 82, trend: 4, status: "stable", summary: "Heart-rate and blood pressure remain within target range." },
  { id: "reports", label: "Reports", x: 82, y: 30, value: 74, trend: 1, status: "watch", summary: "Latest blood report suggests dietary follow-up." },
  { id: "symptoms", label: "Symptoms", x: 78, y: 72, value: 63, trend: -2, status: "watch", summary: "Mild symptom notes with reduced frequency this week." },
  { id: "sleep", label: "Sleep", x: 50, y: 84, value: 70, trend: 5, status: "watch", summary: "Sleep duration improving; deep sleep needs consistency." },
  { id: "activity", label: "Activity", x: 20, y: 71, value: 79, trend: 6, status: "stable", summary: "Movement goals met on 5/7 recent days." },
  { id: "appointments", label: "Appointments", x: 14, y: 33, value: 86, trend: 1, status: "stable", summary: "Follow-up cadence aligned to care schedule." },
  { id: "medications", label: "Medications", x: 36, y: 52, value: 90, trend: 3, status: "stable", summary: "Adherence remains high with only one late dose." },
  { id: "events", label: "Health Events", x: 62, y: 52, value: 76, trend: 2, status: "watch", summary: "Event clustering mostly around low-sleep nights." },
];

export const constellationLinks: ConstellationRelationship[] = [
  { id: "ln-1", from: "sleep", to: "activity", weight: 0.78, relationship: "Higher sleep score aligns with stronger daily movement." },
  { id: "ln-2", from: "activity", to: "vitals", weight: 0.72, relationship: "Steady activity supports resting heart-rate stability." },
  { id: "ln-3", from: "symptoms", to: "reports", weight: 0.66, relationship: "Symptom notes often trigger follow-up lab review." },
  { id: "ln-4", from: "appointments", to: "reports", weight: 0.69, relationship: "Clinical visits convert report findings into actions." },
  { id: "ln-5", from: "medications", to: "events", weight: 0.71, relationship: "Adherence is associated with fewer high-intensity events." },
  { id: "ln-6", from: "sleep", to: "symptoms", weight: 0.83, relationship: "Lower deep sleep correlates with next-day headache entries." },
  { id: "ln-7", from: "vitals", to: "events", weight: 0.58, relationship: "Temporary pulse variation appears before logged events." },
  { id: "ln-8", from: "appointments", to: "medications", weight: 0.62, relationship: "Consultation outcomes update medication cadence." },
];

export const timelineEvents: TimelineEvent[] = [
  { id: "tl-1", date: "2026-09-20 08:10", kind: "vitals", title: "Resting heart rate stable", detail: "Morning reading remained near 7-day average.", score: 84, status: "stable", relatedNode: "vitals" },
  { id: "tl-2", date: "2026-09-20 07:25", kind: "sleep", title: "Sleep score updated", detail: "7.2 hours total, deep sleep slightly below target.", score: 74, status: "watch", relatedNode: "sleep" },
  { id: "tl-3", date: "2026-09-19 20:35", kind: "symptoms", title: "Headache logged", detail: "Mild episode resolved with hydration and rest.", score: 59, status: "watch", relatedNode: "symptoms" },
  { id: "tl-4", date: "2026-09-19 16:30", kind: "reports", title: "Blood report summary posted", detail: "LDL above personal target; physician follow-up suggested.", score: 72, status: "watch", relatedNode: "reports" },
  { id: "tl-5", date: "2026-09-19 13:05", kind: "medications", title: "Dose marked on time", detail: "Omega-3 dose logged within schedule window.", score: 90, status: "stable", relatedNode: "medications" },
  { id: "tl-6", date: "2026-09-19 09:40", kind: "appointments", title: "Appointment reminder sent", detail: "Teleconsultation reminder scheduled for tomorrow.", score: 80, status: "completed", relatedNode: "appointments" },
  { id: "tl-7", date: "2026-09-18 19:20", kind: "activity", title: "Step goal reached", detail: "9,300+ steps achieved with 48 active minutes.", score: 85, status: "stable", relatedNode: "activity" },
  { id: "tl-8", date: "2026-09-18 07:20", kind: "insights", title: "AI pattern generated", detail: "Lower sleep continuity linked to next-day fatigue trend.", score: 76, status: "attention", relatedNode: "events" },
  { id: "tl-9", date: "2026-08-27 11:30", kind: "reports", title: "Sleep study added", detail: "Preventive health report updated in record archive.", score: 77, status: "completed", relatedNode: "reports" },
  { id: "tl-10", date: "2026-09-15 09:30", kind: "appointments", title: "Teleconsultation completed", detail: "Care plan adjusted for hydration and evening routine.", score: 82, status: "completed", relatedNode: "appointments" },
  { id: "tl-11", date: "2026-08-12 10:10", kind: "reports", title: "Cardiology snapshot reviewed", detail: "No sustained rhythm irregularity observed.", score: 88, status: "stable", relatedNode: "reports" },
];

export const todaySnapshot = {
  title: "Today's Health State",
  signal: "Stable with watchpoints",
  summary:
    "Overall trajectory is positive. Monitor evening symptom probability when sleep quality drops and maintain hydration target.",
  nextAction: "Teleconsultation follow-up on 2026-09-22, 09:30",
};

// Compatibility exports for existing phase-1 component APIs.
export const reports: ReportItem[] = reportsData.map((report) => ({
  id: report.id,
  date: report.date,
  type: report.name,
  summary: report.summary,
  status: report.status,
}));

export const notifications: NotificationItem[] = appNotifications.map((notification) => ({
  id: notification.id,
  title: notification.title,
  message: notification.message,
  time: notification.timestamp,
  priority: notification.priority,
  read: notification.read,
  type: notification.type,
}));

export const metricHighlights = healthMetrics.map((metric) => ({
  label: metric.label,
  value: metric.value,
  delta: metric.delta,
}));