import { Link, useNavigate } from "react-router-dom";
import { AuthShell } from "../components/layout/AuthShell";
import { Button } from "../components/ui/Button";
import { Field } from "../components/ui/Field";
import { useToast } from "../components/ui/Toast";

export function RegisterPage() {
  const navigate = useNavigate();
  const { pushToast } = useToast();

  return (
    <AuthShell
      eyebrow="SwasthAI Enrollment"
      title="Create Account"
      subtitle="Create a synthetic patient profile for Phase 1 experience testing."
      footer={
        <>
          Already registered?{" "}
          <Link className="text-[var(--accent)] hover:underline" to="/login">
            Login
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          pushToast("Demo registration", "Patient profile created with synthetic data.");
          navigate("/dashboard");
        }}
      >
        <Field id="register-name" label="Full Name" placeholder="Patient name" required autoComplete="name" />
        <Field id="register-email" label="Email" placeholder="you@domain.com" type="email" required autoComplete="email" />
        <Field
          id="register-password"
          label="Password"
          placeholder="Create password"
          type="password"
          required
          autoComplete="new-password"
        />
        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
    </AuthShell>
  );
}