export type HealthDomain =
  | "vitals"
  | "sleep"
  | "activity"
  | "symptoms"
  | "reports"
  | "appointments"
  | "medications"
  | "events";

export type HealthStatus = "stable" | "watch" | "attention";

export type TrendWindow = "daily" | "weekly" | "monthly";

export type User = {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  location: string;
  memberSince: string;
  emergencyContact: { name: string; relation: string; phone: string };
  preferences: { language: string; timeFormat: "12h" | "24h"; reducedMotion: boolean };
  notificationSettings: {
    appointments: boolean;
    reports: boolean;
    medication: boolean;
    insights: boolean;
  };
};

export type HealthMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  status: HealthStatus;
};

export type Vital = {
  timestamp: string;
  heartRate: number;
  systolicBP: number;
  diastolicBP: number;
  spo2: number;
  temperature: number;
  respiratoryRate: number;
};

export type SleepRecord = {
  id: string;
  date: string;
  durationHours: number;
  deepSleepHours: number;
  sleepScore: number;
};

export type ActivityRecord = {
  id: string;
  date: string;
  steps: number;
  activeMinutes: number;
  caloriesBurned: number;
};

export type SymptomEvent = {
  id: string;
  date: string;
  symptom: string;
  intensity: number;
  note: string;
  resolved: boolean;
};

export type HealthReport = {
  id: string;
  name: string;
  category: "Blood Test" | "Imaging" | "General Checkup" | "Cardiology" | "Preventive Health";
  date: string;
  status: "normal" | "review";
  summary: string;
  keyValues: Array<{ label: string; value: string; reference: string }>;
  relatedTimelineIds: string[];
};

export type Appointment = {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  appointmentType: "Teleconsultation" | "In-person";
  status: "upcoming" | "completed" | "rescheduled";
  location: string;
};

export type Medication = {
  id: string;
  name: string;
  dosage: string;
  schedule: string;
  startDate: string;
  status: "active" | "paused" | "completed";
};

export type AppNotification = {
  id: string;
  type: "appointment" | "report" | "medication" | "health-event" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
};

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

export type ConstellationRelationship = {
  id: string;
  from: HealthDomain;
  to: HealthDomain;
  weight: number;
  relationship: string;
};

export type ConstellationLink = ConstellationRelationship;

export type TimelineKind =
  | "vitals"
  | "reports"
  | "symptoms"
  | "appointments"
  | "medications"
  | "activity"
  | "sleep"
  | "insights";

export type TimelineEvent = {
  id: string;
  date: string;
  kind: TimelineKind;
  title: string;
  detail: string;
  score: number;
  status: "stable" | "watch" | "attention" | "completed";
  relatedNode: HealthDomain;
};

export type VitalPoint = {
  day: string;
  heartRate: number;
  sleepHours: number;
  stress: number;
};

export type InsightItem = {
  id: string;
  headline: string;
  detail: string;
  confidence: number;
};

// Backward-compatible aliases for existing Phase 1 components.
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
  read?: boolean;
  type?: string;
};
export type ConsultationRecord = {
  id: string;
  enrollment: string;
  date: string;
  time: string;
  doctorName: string;

  symptoms: string;
  notes: string;
  prescription: string;
  followUp: string;

  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygen: string;
  };

  status: "saved";
};