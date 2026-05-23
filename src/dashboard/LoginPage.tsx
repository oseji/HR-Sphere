import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Users, BarChart3, Shield } from "lucide-react";
import { useApp } from "../context/AppContext";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const { signIn, createAccount, loginLoading, authError, setAuthError } =
    useApp();

  const DEMO_EMAIL    = "fake@gmail.com";
  const DEMO_PASSWORD = "fakepassword";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const switchMode = (m: "login" | "register") => {
    setMode(m);
    setAuthError("");
    setEmail("");
    setPassword("");
    setConfirm("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      await signIn(email, password);
    } else {
      await createAccount(email, password, confirm);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Brand panel ───────────────────────────────────────────── */}
      <div className="login-brand-panel">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <img src={logo} alt="HR Sphere" className="h-8 w-8 brightness-[10]" />
            <span className="text-xl font-bold">HR Sphere</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight mb-5">
            People ops,<br />
            <span className="text-[#A9F2F6]">simplified.</span>
          </h1>

          <p className="text-white/70 text-base leading-relaxed max-w-sm">
            Manage your team, track performance, and run payroll — all in one
            clean dashboard built for modern HR teams.
          </p>
        </div>

        {/* Feature bullets */}
        <div className="flex flex-col gap-4">
          {[
            { icon: Users, text: "Onboard and manage employees in seconds" },
            { icon: BarChart3, text: "Real-time performance and analytics" },
            { icon: Shield, text: "Secure, role-based access control" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-sm text-white/80">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-[#A9F2F6]" />
              </div>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* ── Form panel ────────────────────────────────────────────── */}
      <div className="login-form-panel">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-10 xl:hidden">
            <img src={logo} alt="" className="h-7 w-7" />
            <span className="font-bold text-slate-900 dark:text-white text-lg">
              HR Sphere
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {mode === "login"
                ? "Sign in to your HR Sphere workspace."
                : "Get started with HR Sphere today."}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-8">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                  mode === m
                    ? "bg-white dark:bg-darkCard text-slate-900 dark:text-white shadow-card"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {m === "login" ? "Sign in" : "Register"}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="form-label">Email address</label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input w-full"
              />
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password (register only) */}
            {mode === "register" && (
              <div>
                <label className="form-label">Confirm password</label>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="form-input w-full"
                />
              </div>
            )}

            {/* Error */}
            {authError && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2 capitalize">
                {authError}
              </p>
            )}

            {/* Demo credentials */}
            {mode === "login" && (
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-faintGreen dark:bg-darkModeGreen border border-buttonGreen/20 dark:border-buttonGreen/30">
                <div>
                  <p className="text-xs font-semibold text-buttonGreen dark:text-[#A9F2F6] mb-0.5">
                    Demo account
                  </p>
                  <p className="text-[11px] text-buttonGreen/70 dark:text-[#A9F2F6]/70 font-mono">
                    {DEMO_EMAIL} · {DEMO_PASSWORD}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); }}
                  className="text-xs font-medium text-buttonGreen dark:text-[#A9F2F6] whitespace-nowrap hover:underline"
                >
                  Autofill →
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loginLoading}
              className="btn btn-primary w-full py-2.5 justify-center mt-1"
            >
              {loginLoading ? (
                <>
                  <span className="spinner" style={{ width: 16, height: 16 }} />
                  {mode === "login" ? "Signing in…" : "Creating account…"}
                </>
              ) : (
                <>
                  {mode === "login" ? "Sign in" : "Create account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
