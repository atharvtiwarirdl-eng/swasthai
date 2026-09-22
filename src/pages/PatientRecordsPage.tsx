import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Field } from "../components/ui/Field";
import { useToast } from "../components/ui/Toast";

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
    age: "34",
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
    age: "29",
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
    medications: [
      "Medication C — As prescribed",
    ],
    reports: [
      "Complete Blood Count — 21 Sep 2026",
      "Thyroid Profile — 19 Sep 2026",
    ],
    appointments: [
      "21 Sep 2026 — General Medicine — Completed",
    ],
    followUps: [
      "Routine follow-up as advised",
    ],
  },
  {
    enrollment: "SW-2026-00126",
    name: "Amit Singh",
    age: "41",
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

export function PatientRecordsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pushToast } = useToast();

  const initialEnrollment = searchParams.get("enrollment") ?? "";
  const [enrollmentNumber, setEnrollmentNumber] =
    useState(initialEnrollment);

  const [selectedPatient, setSelectedPatient] =
    useState<PatientRecord | null>(() => {
      if (!initialEnrollment) {
        return null;
      }

      return (
        patientRecords.find(
          (patient) =>
            patient.enrollment.toLowerCase() ===
            initialEnrollment.toLowerCase(),
        ) ?? null
      );
    });

  const searchedEnrollment = useMemo(
    () => searchParams.get("enrollment"),
    [searchParams],
  );

  const handleSearch = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const value = enrollmentNumber.trim();

    if (!value) {
      pushToast(
        "Enrollment number required",
        "Enter a patient enrollment number to search.",
      );
      return;
    }

    const patient = patientRecords.find(
      (item) =>
        item.enrollment.toLowerCase() === value.toLowerCase(),
    );

    setSearchParams({ enrollment: value });

    if (!patient) {
      setSelectedPatient(null);
      pushToast(
        "Patient not found",
        "No synthetic patient record matches that enrollment number.",
      );
      return;
    }

    setSelectedPatient(patient);

    pushToast(
      "Patient record found",
      `${patient.name}'s record is ready to review.`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="surface-strong rounded-3xl p-5 md:p-7">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
          Clinical Workspace
        </p>

        <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Patient Records
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-1)]">
              Search a connected patient record using the enrollment
              number and review the information shared with your
              professional workspace.
            </p>
          </div>

          {searchedEnrollment ? (
            <p className="text-xs text-[var(--text-2)]">
              Search: {searchedEnrollment}
            </p>
          ) : null}
        </div>

        {/* Search */}
        <form
          className="mt-7 flex flex-col gap-3 md:flex-row md:items-end"
          onSubmit={handleSearch}
        >
          <div className="min-w-0 flex-1">
            <Field
              id="patient-record-enrollment"
              label="Enrollment Number"
              placeholder="e.g. SW-2026-00124"
              value={enrollmentNumber}
              onChange={(event) =>
                setEnrollmentNumber(event.target.value)
              }
            />
          </div>

          <Button type="submit">
            Search Patient
          </Button>
        </form>

        <p className="mt-3 text-xs text-[var(--text-2)]">
          Demo records: SW-2026-00124 · SW-2026-00125 ·
          SW-2026-00126
        </p>
      </section>

      {!selectedPatient ? (
        <section className="surface rounded-2xl p-8 text-center">
          <p className="text-sm font-medium">
            No patient record selected
          </p>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-[var(--text-1)]">
            Enter an enrollment number above to open the patient's
            connected healthcare record.
          </p>
        </section>
      ) : (
        <>
          {/* Patient Identity */}
          <section className="surface rounded-2xl p-5 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-2)]">
                  Patient Overview
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  {selectedPatient.name}
                </h2>

                <p className="mt-1 text-sm text-[var(--text-1)]">
                  {selectedPatient.enrollment}
                </p>
              </div>

              <div className="rounded-xl border border-[var(--line-soft)] px-4 py-3">
                <p className="text-xs text-[var(--text-2)]">
                  Last Visit
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {selectedPatient.lastVisit}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-px overflow-hidden rounded-xl bg-[var(--line-soft)] sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-[var(--surface)] p-4">
                <p className="text-xs text-[var(--text-2)]">
                  Age
                </p>
                <p className="mt-1 font-medium">
                  {selectedPatient.age} years
                </p>
              </div>

              <div className="bg-[var(--surface)] p-4">
                <p className="text-xs text-[var(--text-2)]">
                  Gender
                </p>
                <p className="mt-1 font-medium">
                  {selectedPatient.gender}
                </p>
              </div>

              <div className="bg-[var(--surface)] p-4">
                <p className="text-xs text-[var(--text-2)]">
                  Blood Group
                </p>
                <p className="mt-1 font-medium">
                  {selectedPatient.bloodGroup}
                </p>
              </div>

              <div className="bg-[var(--surface)] p-4">
                <p className="text-xs text-[var(--text-2)]">
                  Contact
                </p>
                <p className="mt-1 font-medium">
                  {selectedPatient.phone}
                </p>
              </div>
            </div>
          </section>

          {/* Current Clinical Context */}
          <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <section className="surface rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
                Current Context
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Consultation
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-[var(--text-2)]">
                    Care type
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedPatient.condition}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[var(--text-2)]">
                    Primary doctor
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedPatient.doctor}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[var(--text-2)]">
                    Last consultation
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedPatient.lastVisit}
                  </p>
                </div>
              </div>
            </section>

            {/* Vitals */}
            <section className="surface rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
                Latest Vitals
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Clinical measurements
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--line-soft)] p-4">
                  <p className="text-xs text-[var(--text-2)]">
                    Blood Pressure
                  </p>
                  <p className="mt-1 font-semibold">
                    {selectedPatient.vitals.bloodPressure}
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--line-soft)] p-4">
                  <p className="text-xs text-[var(--text-2)]">
                    Heart Rate
                  </p>
                  <p className="mt-1 font-semibold">
                    {selectedPatient.vitals.heartRate}
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--line-soft)] p-4">
                  <p className="text-xs text-[var(--text-2)]">
                    Temperature
                  </p>
                  <p className="mt-1 font-semibold">
                    {selectedPatient.vitals.temperature}
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--line-soft)] p-4">
                  <p className="text-xs text-[var(--text-2)]">
                    Oxygen Saturation
                  </p>
                  <p className="mt-1 font-semibold">
                    {selectedPatient.vitals.oxygen}
                  </p>
                </div>
              </div>
            </section>
          </section>

          {/* Record Sections */}
          <section className="grid gap-5 lg:grid-cols-2">
            <section className="surface rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
                Medication History
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Prescriptions
              </h2>

              <div className="mt-5 space-y-3">
                {selectedPatient.medications.map(
                  (medication) => (
                    <div
                      key={medication}
                      className="rounded-xl border border-[var(--line-soft)] p-4 text-sm"
                    >
                      {medication}
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="surface rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
                Medical Reports
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Recent reports
              </h2>

              <div className="mt-5 space-y-3">
                {selectedPatient.reports.map((report) => (
                  <div
                    key={report}
                    className="rounded-xl border border-[var(--line-soft)] p-4 text-sm"
                  >
                    {report}
                  </div>
                ))}
              </div>
            </section>

            <section className="surface rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
                Appointments
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Care schedule
              </h2>

              <div className="mt-5 space-y-3">
                {selectedPatient.appointments.map(
                  (appointment) => (
                    <div
                      key={appointment}
                      className="rounded-xl border border-[var(--line-soft)] p-4 text-sm"
                    >
                      {appointment}
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="surface rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
                Follow-ups
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Next actions
              </h2>

              <div className="mt-5 space-y-3">
                {selectedPatient.followUps.map((followUp) => (
                  <div
                    key={followUp}
                    className="rounded-xl border border-[var(--line-soft)] p-4 text-sm"
                  >
                    {followUp}
                  </div>
                ))}
              </div>
            </section>
          </section>
        </>
      )}
    </div>
  );
}