import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Field } from "../components/ui/Field";
import { useToast } from "../components/ui/Toast";

const appointments = [
  {
    id: "APT-001",
    time: "09:30 AM",
    patient: "Rahul Sharma",
    type: "Follow-up",
    status: "Waiting",
  },
  {
    id: "APT-002",
    time: "10:15 AM",
    patient: "Priya Verma",
    type: "Consultation",
    status: "Confirmed",
  },
  {
    id: "APT-003",
    time: "11:00 AM",
    patient: "Amit Singh",
    type: "Report Review",
    status: "Confirmed",
  },
  {
    id: "APT-004",
    time: "12:30 PM",
    patient: "Neha Gupta",
    type: "Follow-up",
    status: "Upcoming",
  },
];

const recentPatients = [
  {
    name: "Rahul Sharma",
    enrollment: "SW-2026-00124",
    lastVisit: "22 Sep 2026",
  },
  {
    name: "Priya Verma",
    enrollment: "SW-2026-00125",
    lastVisit: "21 Sep 2026",
  },
  {
    name: "Amit Singh",
    enrollment: "SW-2026-00126",
    lastVisit: "20 Sep 2026",
  },
];

export function DoctorDashboardPage() {
  const navigate = useNavigate();
  const { pushToast } = useToast();

  const [enrollmentNumber, setEnrollmentNumber] = useState("");

  const handlePatientSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = enrollmentNumber.trim();

    if (!value) {
      pushToast("Enrollment number required", "Enter a patient enrollment number.");
      return;
    }

    navigate(`/patient-records?enrollment=${encodeURIComponent(value)}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="surface-strong rounded-3xl p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
              Professional Workspace
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Good morning, Doctor.
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-1)]">
              Manage today's appointments, review patient records and stay on
              top of follow-ups from one connected workspace.
            </p>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-sm font-medium">Tuesday, 22 September 2026</p>
            <p className="mt-1 text-xs text-[var(--text-2)]">
              Professional Dashboard
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="surface rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
            Today's Appointments
          </p>
          <p className="mt-3 text-3xl font-semibold">12</p>
          <p className="mt-1 text-sm text-[var(--text-1)]">
            4 remaining today
          </p>
        </div>

        <div className="surface rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
            Waiting
          </p>
          <p className="mt-3 text-3xl font-semibold">03</p>
          <p className="mt-1 text-sm text-[var(--text-1)]">
            Patients in queue
          </p>
        </div>

        <div className="surface rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
            Follow-ups
          </p>
          <p className="mt-3 text-3xl font-semibold">07</p>
          <p className="mt-1 text-sm text-[var(--text-1)]">
            Due this week
          </p>
        </div>

        <div className="surface rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
            Reports
          </p>
          <p className="mt-3 text-3xl font-semibold">05</p>
          <p className="mt-1 text-sm text-[var(--text-1)]">
            Need review
          </p>
        </div>
      </section>

      {/* Patient Search */}
      <section className="surface-strong rounded-3xl p-5 md:p-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Patient Records
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Find a patient
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-[var(--text-1)]">
            Search the connected patient record using the enrollment number.
          </p>

          <form
            className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end"
            onSubmit={handlePatientSearch}
          >
            <div className="min-w-0 flex-1">
              <Field
                id="doctor-enrollment-search"
                label="Enrollment Number"
                placeholder="e.g. SW-2026-00124"
                value={enrollmentNumber}
                onChange={(event) => setEnrollmentNumber(event.target.value)}
              />
            </div>

            <Button type="submit" className="sm:mb-0.5">
              Search Patient
            </Button>
          </form>

          <p className="mt-3 text-xs text-[var(--text-2)]">
            Demo enrollment numbers: SW-2026-00124, SW-2026-00125,
            SW-2026-00126
          </p>
        </div>
      </section>

      {/* Main Workspace */}
      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        {/* Appointments */}
        <section className="surface rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
                Schedule
              </p>
              <h2 className="mt-1 text-xl font-semibold">
                Today's appointments
              </h2>
            </div>

            <Button
              variant="secondary"
              onClick={() => navigate("/appointments")}
            >
              View all
            </Button>
          </div>

          <div className="mt-5 divide-y divide-[var(--line-soft)]">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="min-w-[76px]">
                    <p className="text-sm font-semibold">
                      {appointment.time}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="mt-1 text-sm text-[var(--text-1)]">
                      {appointment.type}
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full border border-[var(--line-soft)] px-3 py-1 text-xs text-[var(--text-1)]">
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="surface rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
            Quick Actions
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            Care workspace
          </h2>

          <div className="mt-5 space-y-2">
            <Button
              className="w-full justify-start"
              onClick={() => navigate("/patient-records")}
            >
              Patient Records
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => navigate("/appointments")}
            >
              Manage Appointments
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => navigate("/reports")}
            >
              Review Reports
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => navigate("/notifications")}
            >
              Notifications
            </Button>
          </div>
        </section>
      </section>

      {/* Recent Patients */}
      <section className="surface rounded-2xl p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-2)]">
              Patient Activity
            </p>
            <h2 className="mt-1 text-xl font-semibold">
              Recent patients
            </h2>
          </div>

          <p className="text-xs text-[var(--text-2)]">
            Synthetic demo records
          </p>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left">
            <thead>
              <tr className="border-b border-[var(--line-soft)] text-xs uppercase tracking-[0.14em] text-[var(--text-2)]">
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Enrollment</th>
                <th className="pb-3 font-medium">Last Visit</th>
                <th className="pb-3 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--line-soft)]">
              {recentPatients.map((patient) => (
                <tr key={patient.enrollment}>
                  <td className="py-4 font-medium">{patient.name}</td>

                  <td className="py-4 text-sm text-[var(--text-1)]">
                    {patient.enrollment}
                  </td>

                  <td className="py-4 text-sm text-[var(--text-1)]">
                    {patient.lastVisit}
                  </td>

                  <td className="py-4 text-right">
                    <Button
                      variant="secondary"
                      onClick={() =>
                        navigate(
                          `/patient-records?enrollment=${encodeURIComponent(
                            patient.enrollment,
                          )}`,
                        )
                      }
                    >
                      Open Record
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}