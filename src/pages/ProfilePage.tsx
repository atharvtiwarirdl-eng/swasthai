import { syntheticUser } from "../data/syntheticHealthData";

export function ProfilePage() {
  return (
    <div className="space-y-4">
      <section>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-2)]">Demo Identity</p>
        <h2 className="mt-2 text-3xl font-semibold">Patient Profile</h2>
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="surface rounded-2xl p-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <div className="mt-3 space-y-2 text-sm text-[var(--text-1)]">
            <p>Name: {syntheticUser.fullName}</p>
            <p>Age: {syntheticUser.age}</p>
            <p>Gender: {syntheticUser.gender}</p>
            <p>Location: {syntheticUser.location}</p>
            <p>Member since: {syntheticUser.memberSince}</p>
          </div>
        </article>
        <article className="surface rounded-2xl p-4">
          <h3 className="text-lg font-semibold">Emergency Contact</h3>
          <div className="mt-3 space-y-2 text-sm text-[var(--text-1)]">
            <p>Name: {syntheticUser.emergencyContact.name}</p>
            <p>Relation: {syntheticUser.emergencyContact.relation}</p>
            <p>Phone: {syntheticUser.emergencyContact.phone}</p>
          </div>
        </article>
      </section>
      <section className="surface rounded-2xl p-4">
        <h3 className="text-lg font-semibold">Preferences and Notifications</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm text-[var(--text-1)]">
          <p>Language: {syntheticUser.preferences.language}</p>
          <p>Time format: {syntheticUser.preferences.timeFormat}</p>
          <p>Appointment alerts: {syntheticUser.notificationSettings.appointments ? "Enabled" : "Disabled"}</p>
          <p>Report alerts: {syntheticUser.notificationSettings.reports ? "Enabled" : "Disabled"}</p>
          <p>Medication alerts: {syntheticUser.notificationSettings.medication ? "Enabled" : "Disabled"}</p>
          <p>Insight alerts: {syntheticUser.notificationSettings.insights ? "Enabled" : "Disabled"}</p>
        </div>
        <p className="mt-3 text-xs text-[var(--text-2)]">Profile data is synthetic and intended only for demo workflows.</p>
      </section>
    </div>
  );
}