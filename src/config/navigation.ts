export const appRoutes = [
  { to: "/dashboard", label: "Dashboard", subtitle: "Today and priority signals" },
  { to: "/health", label: "Health Overview", subtitle: "Cross-domain patterns" },
  { to: "/timeline", label: "Health Timeline", subtitle: "Clinical sequence" },
  { to: "/reports", label: "Medical Reports", subtitle: "Structured report history" },
  { to: "/appointments", label: "Appointments", subtitle: "Care schedule and follow-ups" },
  { to: "/medications", label: "Medications", subtitle: "Adherence and dosage cadence" },
  { to: "/notifications", label: "Notifications", subtitle: "Health and system updates" },
  { to: "/profile", label: "Profile", subtitle: "Preferences and demo identity" },
] as const;