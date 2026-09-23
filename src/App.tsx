import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppShell } from "./components/layout/AppShell";
import { ToastProvider } from "./components/ui/Toast";

import { AppointmentsPage } from "./pages/AppointmentsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DoctorDashboardPage } from "./pages/DoctorDashboardPage";
import { HealthOverviewPage } from "./pages/HealthOverviewPage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { MedicationsPage } from "./pages/MedicationsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { PatientRecordsPage } from "./pages/PatientRecordsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";
import { ReportsPage } from "./pages/ReportsPage";
import { TimelinePage } from "./pages/TimelinePage";
import { ConsultationPage } from "./pages/ConsultationPage";

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Application workspace */}
          <Route element={<AppShell />}>
            {/* Doctor / Hospital workspace */}
            <Route
              path="/doctor"
              element={<DoctorDashboardPage />}
            />

            {/* Patient Records */}
            <Route
              path="/patient-records"
              element={<PatientRecordsPage />}
            />

            {/* Consultation Workspace */}
            <Route
              path="/consultation"
              element={<ConsultationPage />}
            />

            {/* Patient workspace */}
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            <Route
              path="/health"
              element={<HealthOverviewPage />}
            />

            <Route
              path="/timeline"
              element={<TimelinePage />}
            />

            <Route
              path="/reports"
              element={<ReportsPage />}
            />

            <Route
              path="/appointments"
              element={<AppointmentsPage />}
            />

            <Route
              path="/medications"
              element={<MedicationsPage />}
            />

            <Route
              path="/notifications"
              element={<NotificationsPage />}
            />

            <Route
              path="/profile"
              element={<ProfilePage />}
            />
          </Route>

          {/* Fallback */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}