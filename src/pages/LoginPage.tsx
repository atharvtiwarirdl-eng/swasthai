import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useToast } from "../components/ui/Toast";

export function LoginPage() {
  const navigate = useNavigate();
  const { pushToast } = useToast();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <form
        className="surface-strong w-full rounded-3xl p-7"
        onSubmit={(event) => {
          event.preventDefault();
          pushToast("Demo login", "Signed in with synthetic patient account.");
          navigate("/dashboard");
        }}
      >
        <p className="text-xs uppercase tracking-[0.26em] text-[var(--text-1)]">SwasthAI Access</p>
        <h1 className="mt-2 text-3xl font-semibold">Patient Login</h1>
        <p className="mt-2 text-sm text-[var(--text-1)]">Authentication is simulated for Phase 1.</p>
        <div className="mt-6 space-y-4">
          <Input placeholder="Email" type="email" required />
          <Input placeholder="Password" type="password" required />
          <Button className="w-full">Continue</Button>
        </div>
        <p className="mt-5 text-sm text-[var(--text-1)]">
          New to SwasthAI?{" "}
          <Link className="text-[var(--accent)]" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}