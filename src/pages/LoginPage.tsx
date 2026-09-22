import { Link, useNavigate } from "react-router-dom";
import { AuthShell } from "../components/layout/AuthShell";
import { Button } from "../components/ui/Button";
import { Field } from "../components/ui/Field";
import { useToast } from "../components/ui/Toast";

export function LoginPage() {
  const navigate = useNavigate();
  const { pushToast } = useToast();

  return (
    <AuthShell
      eyebrow="SwasthAI Access"
      title="Patient Login"
      subtitle="Authentication is simulated for Phase 1."
      footer={
        <>
          New to SwasthAI?{" "}
          <Link className="text-[var(--accent)] hover:underline" to="/register">
            Register
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          pushToast("Demo login", "Signed in with synthetic patient account.");
          navigate("/dashboard");
        }}
      >
        <Field id="login-email" label="Email" placeholder="you@domain.com" type="email" required autoComplete="email" />
        <Field
          id="login-password"
          label="Password"
          placeholder="Enter password"
          type="password"
          required
          autoComplete="current-password"
        />
        <Button className="w-full" type="submit">
          Continue
        </Button>
      </form>
    </AuthShell>
  );
}