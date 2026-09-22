import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

export function LandingPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-0)]">
      {/* Header */}
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              SwasthAI
            </p>
            <p className="text-xs text-[var(--text-1)]">
              Connected Healthcare
            </p>
          </div>

          <Link
            to="/login?role=patient"
            className="text-sm text-[var(--text-1)] transition hover:text-[var(--text-0)]"
          >
            Patient Access
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Connected Care Platform
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-7xl">
              One connected record.
              <br />
              Better care.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--text-1)]">
              SwasthAI connects doctors, hospitals, clinics and patients
              through one structured healthcare record.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/login?role=professional"
                className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Doctor / Hospital
              </Link>

              <Link
                to="/login?role=patient"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-semibold transition hover:bg-white/5"
              >
                Patient Login
              </Link>
            </div>
          </motion.div>

          {/* Clinical record preview */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="surface overflow-hidden"
          >
            <div className="border-b border-[var(--border)] px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-1)]">
                    Patient Record
                  </p>
                  <p className="mt-1 font-semibold">
                    SW-2026-00124
                  </p>
                </div>

                <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-1)]">
                  Active
                </span>
              </div>
            </div>

            <div className="grid gap-px bg-[var(--border)] sm:grid-cols-2">
              <div className="bg-[var(--surface)] p-5">
                <p className="text-xs text-[var(--text-1)]">
                  Latest consultation
                </p>
                <p className="mt-2 font-medium">
                  General Medicine
                </p>
                <p className="mt-1 text-sm text-[var(--text-1)]">
                  22 September 2026
                </p>
              </div>

              <div className="bg-[var(--surface)] p-5">
                <p className="text-xs text-[var(--text-1)]">
                  Reports
                </p>
                <p className="mt-2 font-medium">
                  05 available
                </p>
                <p className="mt-1 text-sm text-[var(--text-1)]">
                  Latest report synced
                </p>
              </div>

              <div className="bg-[var(--surface)] p-5">
                <p className="text-xs text-[var(--text-1)]">
                  Prescriptions
                </p>
                <p className="mt-2 font-medium">
                  02 active
                </p>
                <p className="mt-1 text-sm text-[var(--text-1)]">
                  Medication history connected
                </p>
              </div>

              <div className="bg-[var(--surface)] p-5">
                <p className="text-xs text-[var(--text-1)]">
                  Follow-up
                </p>
                <p className="mt-2 font-medium">
                  28 September
                </p>
                <p className="mt-1 text-sm text-[var(--text-1)]">
                  Scheduled appointment
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Access */}
        <section className="border-y border-[var(--border)]">
          <div className="mx-auto max-w-[1280px] px-6 py-16">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
                Access
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Choose your workspace
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Link
                to="/login?role=professional"
                className="group surface p-7 transition hover:-translate-y-1"
              >
                <p className="text-sm text-[var(--text-1)]">
                  For healthcare professionals
                </p>

                <h3 className="mt-3 text-2xl font-semibold">
                  Doctor / Hospital
                </h3>

                <p className="mt-4 max-w-xl leading-7 text-[var(--text-1)]">
                  Manage appointments, patient records, reports,
                  prescriptions and follow-ups from one workspace.
                </p>

                <span className="mt-7 inline-block text-sm font-semibold text-[var(--accent)]">
                  Continue to professional login →
                </span>
              </Link>

              <Link
                to="/login?role=patient"
                className="group surface p-7 transition hover:-translate-y-1"
              >
                <p className="text-sm text-[var(--text-1)]">
                  For patients
                </p>

                <h3 className="mt-3 text-2xl font-semibold">
                  Patient Portal
                </h3>

                <p className="mt-4 max-w-xl leading-7 text-[var(--text-1)]">
                  View appointments, prescriptions, medical reports,
                  health history and follow-up information shared by
                  your healthcare provider.
                </p>

                <span className="mt-7 inline-block text-sm font-semibold text-[var(--accent)]">
                  Continue to patient login →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-[1280px] px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
            How SwasthAI works
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div>
              <span className="text-sm font-semibold text-[var(--accent)]">
                01
              </span>
              <h3 className="mt-3 text-xl font-semibold">
                Information is recorded
              </h3>
              <p className="mt-3 leading-7 text-[var(--text-1)]">
                Clinics and healthcare professionals manage patient
                information in a structured record.
              </p>
            </div>

            <div>
              <span className="text-sm font-semibold text-[var(--accent)]">
                02
              </span>
              <h3 className="mt-3 text-xl font-semibold">
                The record stays connected
              </h3>
              <p className="mt-3 leading-7 text-[var(--text-1)]">
                Consultations, reports, prescriptions, appointments
                and follow-ups remain connected.
              </p>
            </div>

            <div>
              <span className="text-sm font-semibold text-[var(--accent)]">
                03
              </span>
              <h3 className="mt-3 text-xl font-semibold">
                Patients see shared information
              </h3>
              <p className="mt-3 leading-7 text-[var(--text-1)]">
                Relevant information can be made available through
                the patient portal.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-6 py-7 text-sm text-[var(--text-1)] sm:flex-row sm:items-center sm:justify-between">
          <p>SwasthAI</p>
          <p>Connected healthcare infrastructure</p>
        </div>
      </footer>
    </div>
  );
}