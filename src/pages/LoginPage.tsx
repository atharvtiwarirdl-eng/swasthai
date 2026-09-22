import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthShell } from "../components/layout/AuthShell";
import { Button } from "../components/ui/Button";
import { Field } from "../components/ui/Field";
import { useToast } from "../components/ui/Toast";

export function LoginPage() {
  const navigate = useNavigate();
  const { pushToast } = useToast();
  const [searchParams] = useSearchParams();

  const isProfessional =
    searchParams.get("role") === "professional";

  const title = isProfessional
    ? "Doctor / Hospital Login"
    : "Patient Login";

  const subtitle = isProfessional
    ? "Access appointments, patient records, reports and care management."
    : "Access your appointments, reports, prescriptions and health history.";

  const eyebrow = isProfessional
    ? "SwasthAI Professional Access"
    : "SwasthAI Patient Access";

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isProfessional) {
      pushToast(
        "Professional login",
        "Signed in with synthetic doctor account.",
      );

      navigate("/doctor");
      return;
    }

    pushToast(
      "Patient login",
      "Signed in with synthetic patient account.",
    );

    navigate("/dashboard");
  };

  return (
    <AuthShell
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      footer={
        <>
          New to SwasthAI?{" "}
          <Link
            to="/register"
            className="text-[var(--accent)] hover:underline"
          >
            Register
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <Field
          id="login-email"
          label={isProfessional ? "Professional Email" : "Email"}
          placeholder={
            isProfessional
              ? "doctor@hospital.com"
              : "you@domain.com"
          }
          type="email"
          required
          autoComplete="email"
        />

        <Field
          id="login-password"
          label="Password"
          placeholder="Enter password"
          type="password"
          required
          autoComplete="current-password"
        />

        <Button
          className="w-full"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </AuthShell>
  );
}