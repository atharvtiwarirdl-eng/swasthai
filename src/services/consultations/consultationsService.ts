import { type ConsultationRecord } from "../../types/health";
import { simulateApi } from "../api/mockClient";

const initialConsultations: ConsultationRecord[] = [
  {
    id: "CONS-2026-001",
    enrollment: "SW-2026-00124",
    date: "22 Sep 2026",
    time: "10:30 AM",
    doctorName: "Dr. Ananya Mehta",
    symptoms: "Routine follow-up",
    notes: "Patient is stable. Previous reports reviewed.",
    prescription: "Continue current medications.",
    followUp: "06 Oct 2026",
    vitals: {
      bloodPressure: "122/80 mmHg",
      heartRate: "76 bpm",
      temperature: "98.4°F",
      oxygen: "98%",
    },
    status: "saved",
  },
  {
    id: "CONS-2026-002",
    enrollment: "SW-2026-00125",
    date: "21 Sep 2026",
    time: "02:15 PM",
    doctorName: "Dr. Ananya Mehta",
    symptoms: "General consultation",
    notes: "No major concerns reported.",
    prescription: "Continue prescribed medication.",
    followUp: "05 Oct 2026",
    vitals: {
      bloodPressure: "118/76 mmHg",
      heartRate: "72 bpm",
      temperature: "98.1°F",
      oxygen: "99%",
    },
    status: "saved",
  },
];

let consultationsData: ConsultationRecord[] = [
  ...initialConsultations,
];

export async function getConsultationsByEnrollment(
  enrollment: string,
) {
  const normalizedEnrollment = enrollment.trim().toLowerCase();

  const consultations = consultationsData.filter(
    (consultation) =>
      consultation.enrollment.toLowerCase() === normalizedEnrollment,
  );

  return simulateApi(consultations);
}

export async function getConsultationById(
  consultationId: string,
) {
  const consultation =
    consultationsData.find(
      (item) => item.id === consultationId,
    ) ?? null;

  return simulateApi(consultation);
}

export async function createConsultation(
  consultation: ConsultationRecord,
) {
  consultationsData = [
    consultation,
    ...consultationsData,
  ];

  return simulateApi(consultation);
}