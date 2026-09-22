import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useToast } from "../components/ui/Toast";

export function RegisterPage() {
  const navigate = useNavigate();
  const { pushToast } = useToast();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <form
        className="surface-strong w-full rounded-3xl p-7"
        onSubmit={(event) => {
          event.preventDefault();
          pushToast("Demo registration", "Patient profile created with synthetic data.");
          navigate("/dashboard");
        }}
      >
        <p className="text-xs uppercase tracking-[0.26em] text-[var(--text-1)]">SwasthAI Enrollment</p>
        <h1 className="mt-2 text-3xl font-semibold">Create Account</h1>
        <div className="mt-6 space-y-4">
          <Input placeholder="Full name" required />
          <Input placeholder="Email" type="email" required />
          <Input placeholder="Password" type="password" required />
          <Button className="w-full">Register</Button>
        </div>
        <p className="mt-5 text-sm text-[var(--text-1)]">
          Already registered?{" "}
          <Link className="text-[var(--accent)]" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}