import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { Field } from "../components/ui/Field";
import { useToast } from "../components/ui/Toast";
import {
  createConsultation,
  getConsultationsByEnrollment,
} from "../services/consultations/consultationsService";
import type { ConsultationRecord } from "../types/health";

type ConsultationData = {
  symptoms: string;
  notes: string;
  prescription: string;
  followUp: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  oxygen: string;
};

type PatientRecord = {
  enrollment: string;
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  phone: string;
  lastVisit: string;
  condition: string;
  doctor: string;
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygen: string;
  };
  medications: string[];
  reports: string[];
  appointments: string[];
  followUps: string[];
};

const patientRecords: PatientRecord[] = [
  {
    enrollment: "SW-2026-00124",
    name: "Rahul Sharma",
    age: "34 years",
    gender: "Male",
    bloodGroup: "O+",
    phone: "+91 98XXXXXX24",
    lastVisit: "22 Sep 2026",
    condition: "Routine follow-up",
    doctor: "Dr. Ananya Mehta",
    vitals: {
      bloodPressure: "122 / 80 mmHg",
      heartRate: "76 bpm",
      temperature: "98.4°F",
      oxygen: "98%",
    },
    medications: [
      "Medication A — 1 tablet after breakfast",
      "Medication B — 1 tablet after dinner",
    ],
    reports: [
      "Complete Blood Count — 22 Sep 2026",
      "Lipid Profile — 20 Sep 2026",
      "Blood Chemistry — 20 Sep 2026",
    ],
    appointments: [
      "22 Sep 2026 — General Medicine — Completed",
      "28 Sep 2026 — Follow-up — Upcoming",
    ],
    followUps: [
      "Follow-up consultation scheduled for 28 Sep 2026",
      "Review latest laboratory reports",
    ],
  },
  {
    enrollment: "SW-2026-00125",
    name: "Priya Verma",
    age: "29 years",
    gender: "Female",
    bloodGroup: "B+",
    phone: "+91 97XXXXXX25",
    lastVisit: "21 Sep 2026",
    condition: "General consultation",
    doctor: "Dr. Ananya Mehta",
    vitals: {
      bloodPressure: "118 / 76 mmHg",
      heartRate: "72 bpm",
      temperature: "98.1°F",
      oxygen: "99%",
    },
    medications: ["Medication C — As prescribed"],
    reports: [
      "Complete Blood Count — 21 Sep 2026",
      "Thyroid Profile — 19 Sep 2026",
    ],
    appointments: [
      "21 Sep 2026 — General Medicine — Completed",
    ],
    followUps: ["Routine follow-up as advised"],
  },
  {
    enrollment: "SW-2026-00126",
    name: "Amit Singh",
    age: "41 years",
    gender: "Male",
    bloodGroup: "A+",
    phone: "+91 96XXXXXX26",
    lastVisit: "20 Sep 2026",
    condition: "Report review",
    doctor: "Dr. Ananya Mehta",
    vitals: {
      bloodPressure: "126 / 82 mmHg",
      heartRate: "79 bpm",
      temperature: "98.6°F",
      oxygen: "97%",
    },
    medications: [
      "Medication D — As prescribed",
      "Medication E — As prescribed",
    ],
    reports: [
      "Liver Function Test — 20 Sep 2026",
      "Blood Chemistry — 18 Sep 2026",
    ],
    appointments: [
      "20 Sep 2026 — Report Review — Completed",
    ],
    followUps: [
      "Review treatment response at next consultation",
    ],
  },
];

export function ConsultationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pushToast } = useToast();

  const enrollment = searchParams.get("enrollment") ?? "";

  const selectedPatient = useMemo(() => {
    if (!enrollment) {
      return null;
    }

    return (
      patientRecords.find(
        (patient) =>
          patient.enrollment.toLowerCase() ===
          enrollment.toLowerCase(),
      ) ?? null
    );
  }, [enrollment]);

  const [consultation, setConsultation] =
    useState<ConsultationData>(() => {
      const patient =
        patientRecords.find(
          (item) =>
            item.enrollment.toLowerCase() ===
            enrollment.toLowerCase(),
        ) ?? null;

      return {
        symptoms: "",
        notes: "",
        prescription: "",
        followUp: "",
        bloodPressure:
          patient?.vitals.bloodPressure ?? "",
        heartRate:
          patient?.vitals.heartRate ?? "",
        temperature:
          patient?.vitals.temperature ?? "",
        oxygen:
          patient?.vitals.oxygen ?? "",
      };
    });

  const [previousConsultations, setPreviousConsultations] =
    useState<ConsultationRecord[]>([]);

  const [isSaving, setIsSaving] = useState(false);

  /*
   * Load consultation history for the selected patient.
   */
  useEffect(() => {
    if (!selectedPatient) {
      setPreviousConsultations([]);
      return;
    }

    let active = true;

    const loadConsultations = async () => {
      const records = await getConsultationsByEnrollment(
        selectedPatient.enrollment,
      );

      if (active) {
        setPreviousConsultations(records);
      }
    };

    void loadConsultations();

    return () => {
      active = false;
    };
  }, [selectedPatient]);

  const updateField = (
    field: keyof ConsultationData,
    value: string,
  ) => {
    setConsultation((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const goBackToRecord = () => {
    if (!selectedPatient) {
      navigate("/patient-records");
      return;
    }

    navigate(
      `/patient-records?enrollment=${encodeURIComponent(
        selectedPatient.enrollment,
      )}`,
    );
  };

  const handleSave = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!selectedPatient) {
      pushToast(
        "Patient record unavailable",
        "Open a valid patient record before starting a consultation.",
      );
      return;
    }

    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const now = new Date();

      const savedConsultation: ConsultationRecord = {
        id: `CONS-${Date.now()}`,
        enrollment: selectedPatient.enrollment,
        date: now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        time: now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        doctorName: selectedPatient.doctor,
        symptoms: consultation.symptoms,
        notes: consultation.notes,
        prescription: consultation.prescription,
        followUp: consultation.followUp,
        vitals: {
          bloodPressure: consultation.bloodPressure,
          heartRate: consultation.heartRate,
          temperature: consultation.temperature,
          oxygen: consultation.oxygen,
        },
        status: "saved",
      };

      const saved = await createConsultation(
        savedConsultation,
      );

      setPreviousConsultations((current) => [
        saved,
        ...current,
      ]);

      pushToast(
        "Consultation saved",
        `${selectedPatient.name}'s consultation has been saved successfully.`,
      );

      /*
       * Reset consultation fields after successful save.
       * Keep current patient vitals available for another entry.
       */
      setConsultation({
        symptoms: "",
        notes: "",
        prescription: "",
        followUp: "",
        bloodPressure:
          selectedPatient.vitals.bloodPressure,
        heartRate:
          selectedPatient.vitals.heartRate,
        temperature:
          selectedPatient.vitals.temperature,
        oxygen: selectedPatient.vitals.oxygen,
      });
    } catch {
      pushToast(
        "Unable to save consultation",
        "Something went wrong while saving the consultation.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  /* =============================================================
     INVALID / MISSING PATIENT
  ============================================================= */

  if (!selectedPatient) {
    return (
      <div className="space-y-6">
        <section className="surface-strong rounded-3xl p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
            Clinical Workspace
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Consultation
          </h1>

          <div className="mt-6 rounded-2xl border border-[var(--line-soft)] p-5">
            <p className="text-sm font-medium">
              Patient record not found
            </p>

            <p className="mt-2 text-sm leading-relaxed text-[var(--text-1)]">
              A valid patient enrollment number is required to
              start a consultation.
            </p>

            {enrollment ? (
              <p className="mt-3 text-xs text-[var(--text-2)]">
                Enrollment: {enrollment}
              </p>
            ) : null}

            <div className="mt-5">
              <Button
                type="button"
                onClick={() => navigate("/patient-records")}
              >
                Back to Patient Records
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* =========================================================
          HEADER
      ========================================================== */}

      <section className="surface-strong rounded-3xl p-5 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              Clinical Workspace
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              New Consultation
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-1)]">
              Record the current consultation and keep the
              patient's clinical information connected to their
              healthcare record.
            </p>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={goBackToRecord}
          >
            Back to Record
          </Button>
        </div>
      </section>

      {/* =========================================================
          PATIENT IDENTITY
      ========================================================== */}

      <section className="surface rounded-2xl p-5 md:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-2)]">
              Patient
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              {selectedPatient.name}
            </h2>

            <p className="mt-1 text-sm text-[var(--text-1)]">
              {selectedPatient.enrollment}
            </p>

            <p className="mt-2 text-sm text-[var(--text-1)]">
              {selectedPatient.condition}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[var(--line-soft)] sm:grid-cols-4">
            <div className="bg-[var(--surface)] px-4 py-3">
              <p className="text-xs text-[var(--text-2)]">
                Age
              </p>

              <p className="mt-1 text-sm font-medium">
                {selectedPatient.age}
              </p>
            </div>

            <div className="bg-[var(--surface)] px-4 py-3">
              <p className="text-xs text-[var(--text-2)]">
                Gender
              </p>

              <p className="mt-1 text-sm font-medium">
                {selectedPatient.gender}
              </p>
            </div>

            <div className="bg-[var(--surface)] px-4 py-3">
              <p className="text-xs text-[var(--text-2)]">
                Blood Group
              </p>

              <p className="mt-1 text-sm font-medium">
                {selectedPatient.bloodGroup}
              </p>
            </div>

            <div className="bg-[var(--surface)] px-4 py-3">
              <p className="text-xs text-[var(--text-2)]">
                Last Visit
              </p>

              <p className="mt-1 text-sm font-medium">
                {selectedPatient.lastVisit}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN WORKSPACE
      ========================================================== */}

      <div className="grid gap-5 xl:grid-cols-[1.45fr_0.75fr]">
        <form
          className="space-y-5"
          onSubmit={handleSave}
        >
          {/* =====================================================
              SYMPTOMS
          ====================================================== */}

          <section className="surface rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
              Consultation
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Symptoms & Complaints
            </h2>

            <textarea
              value={consultation.symptoms}
              onChange={(event) =>
                updateField(
                  "symptoms",
                  event.target.value,
                )
              }
              placeholder="Enter symptoms or patient complaints..."
              rows={5}
              className="mt-5 w-full rounded-xl border border-[var(--line-soft)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--text-2)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10"
            />
          </section>

          {/* =====================================================
              VITALS
          ====================================================== */}

          <section className="surface rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
              Clinical Measurements
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Current Vitals
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field
                id="consultation-bp"
                label="Blood Pressure"
                placeholder="e.g. 120 / 80"
                value={consultation.bloodPressure}
                onChange={(event) =>
                  updateField(
                    "bloodPressure",
                    event.target.value,
                  )
                }
              />

              <Field
                id="consultation-heart-rate"
                label="Heart Rate"
                placeholder="e.g. 76 bpm"
                value={consultation.heartRate}
                onChange={(event) =>
                  updateField(
                    "heartRate",
                    event.target.value,
                  )
                }
              />

              <Field
                id="consultation-temperature"
                label="Temperature"
                placeholder="e.g. 98.4°F"
                value={consultation.temperature}
                onChange={(event) =>
                  updateField(
                    "temperature",
                    event.target.value,
                  )
                }
              />

              <Field
                id="consultation-oxygen"
                label="Oxygen"
                placeholder="e.g. 98%"
                value={consultation.oxygen}
                onChange={(event) =>
                  updateField(
                    "oxygen",
                    event.target.value,
                  )
                }
              />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[var(--text-2)]">
              These values are pre-filled from the patient's latest
              record and can be updated for the current consultation.
            </p>
          </section>

          {/* =====================================================
              CLINICAL NOTES
          ====================================================== */}

          <section className="surface rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
              Doctor's Notes
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Clinical Notes
            </h2>

            <textarea
              value={consultation.notes}
              onChange={(event) =>
                updateField(
                  "notes",
                  event.target.value,
                )
              }
              placeholder="Enter clinical observations, assessment notes and consultation details..."
              rows={7}
              className="mt-5 w-full rounded-xl border border-[var(--line-soft)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--text-2)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10"
            />
          </section>

          {/* =====================================================
              PRESCRIPTION
          ====================================================== */}

          <section className="surface rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
              Medication
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Prescription
            </h2>

            <textarea
              value={consultation.prescription}
              onChange={(event) =>
                updateField(
                  "prescription",
                  event.target.value,
                )
              }
              placeholder="Enter prescribed medications and instructions..."
              rows={6}
              className="mt-5 w-full rounded-xl border border-[var(--line-soft)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--text-2)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10"
            />
          </section>

          {/* =====================================================
              FOLLOW UP
          ====================================================== */}

          <section className="surface rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
              Care Continuity
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Follow-up
            </h2>

            <div className="mt-5 max-w-sm">
              <Field
                id="consultation-follow-up"
                label="Follow-up Date"
                type="date"
                value={consultation.followUp}
                onChange={(event) =>
                  updateField(
                    "followUp",
                    event.target.value,
                  )
                }
              />
            </div>
          </section>

          {/* =====================================================
              SAVE / CANCEL
          ====================================================== */}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={goBackToRecord}
              disabled={isSaving}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSaving}
            >
              {isSaving
                ? "Saving Consultation..."
                : "Save Consultation"}
            </Button>
          </div>
        </form>

        {/* =======================================================
            RIGHT SIDEBAR
        ======================================================== */}

        <aside className="space-y-5">
          {/* =====================================================
              PATIENT SUMMARY
          ====================================================== */}

          <section className="surface rounded-2xl p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                  Intelligence
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Patient Summary
                </h2>
              </div>

              <span className="rounded-full border border-[var(--line-soft)] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--text-2)]">
                AI
              </span>
            </div>

            <div className="mt-5 rounded-xl border border-dashed border-[var(--line-soft)] p-4">
              <p className="text-sm font-medium">
                Summary will appear here
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[var(--text-1)]">
                This space will later summarize the patient's
                connected history, recent reports, medications and
                previous consultations for the doctor.
              </p>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[var(--text-2)]">
              The doctor remains responsible for reviewing and
              confirming all clinical information.
            </p>
          </section>

          {/* =====================================================
              PREVIOUS CONSULTATIONS
          ====================================================== */}

          <section className="surface rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
              History
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Previous Consultations
            </h2>

            {previousConsultations.length === 0 ? (
              <div className="mt-5 rounded-xl border border-dashed border-[var(--line-soft)] p-4">
                <p className="text-sm text-[var(--text-1)]">
                  No previous consultation records available.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {previousConsultations.map((item) => (
                  <div
                    key={item.id}
                    className="border-l-2 border-[var(--accent)] pl-4"
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-xs text-[var(--text-2)]">
                        {item.date}
                      </p>

                      <span className="text-xs text-[var(--text-2)]">
                        •
                      </span>

                      <p className="text-xs text-[var(--text-2)]">
                        {item.time}
                      </p>
                    </div>

                    <p className="mt-1 text-sm font-semibold">
                      General Medicine
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-1)]">
                      {item.symptoms ||
                        item.notes ||
                        "Consultation record saved."}
                    </p>

                    {item.doctorName ? (
                      <p className="mt-2 text-xs text-[var(--text-2)]">
                        {item.doctorName}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* =====================================================
              RECENT REPORTS
          ====================================================== */}

          <section className="surface rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
              Reports
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Recent Medical Reports
            </h2>

            <div className="mt-5 space-y-3">
              {selectedPatient.reports.map((report) => {
                const [name, date] = report.split(" — ");

                return (
                  <div
                    key={report}
                    className="rounded-xl border border-[var(--line-soft)] p-4"
                  >
                    <p className="text-sm font-medium">
                      {name}
                    </p>

                    <p className="mt-1 text-xs text-[var(--text-2)]">
                      {date ?? "Date unavailable"}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* =====================================================
              CURRENT CARE
          ====================================================== */}

          <section className="surface rounded-2xl p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
              Current Care
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Active Medications
            </h2>

            <div className="mt-5 space-y-3">
              {selectedPatient.medications.map((medication) => (
                <div
                  key={medication}
                  className="rounded-xl border border-[var(--line-soft)] p-4 text-sm leading-relaxed"
                >
                  {medication}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}