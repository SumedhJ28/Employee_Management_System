"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"employee" | "hr">("employee");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  /* ⌨️ Enter key support */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !forgot) handleLogin();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [email, password, role, forgot]);

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      document.cookie = `role=${role}; path=/; max-age=86400`;
      window.location.href =
        role === "hr" ? "/hr/dashboard" : "/employee/dashboard";
    }, 1200);
  };

  const handleReset = () => {
    if (!email) {
      setError("Enter your email to reset password");
      return;
    }
    setResetDone(true);
    setTimeout(() => setForgot(false), 1500);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        dark
          ? "bg-gradient-to-br from-gray-900 to-black"
          : "bg-gradient-to-br from-indigo-100 via-white to-blue-100"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 transition-all duration-500 ${
          dark ? "bg-gray-900 text-white" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-sm opacity-70">Sign in to continue</p>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="text-sm border rounded-full px-3 py-1"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-500 animate-shake">
            {error}
          </div>
        )}

        {/* Forgot Password */}
        {forgot ? (
          <div className="space-y-4 animate-fade">
            <input
              type="email"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm bg-transparent"
            />

            <button
              onClick={handleReset}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl"
            >
              Reset Password
            </button>

            {resetDone && (
              <p className="text-sm text-green-500">
                Reset link sent!
              </p>
            )}

            <button
              onClick={() => setForgot(false)}
              className="text-xs opacity-70"
            >
              ← Back to login
            </button>
          </div>
        ) : (
          <>
            {/* Inputs */}
            <div className="space-y-4">
              <input
                autoFocus
                type="email"
                placeholder="Email"
                className="w-full border rounded-xl px-4 py-3 text-sm bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-xl px-4 py-3 text-sm bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Role toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                {["employee", "hr"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r as any)}
                    className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                      role === r
                        ? "bg-white dark:bg-black shadow font-medium"
                        : "opacity-60"
                    }`}
                  >
                    {r === "employee" ? "Employee" : "HR"}
                  </button>
                ))}
              </div>

              {/* Login button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center"
              >
                {loading ? <Spinner /> : "Login"}
              </button>

              <button
                onClick={() => setForgot(true)}
                className="text-xs opacity-70"
              >
                Forgot password?
              </button>
            </div>
          </>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fade {
          animation: fade 0.4s ease;
        }
        .animate-shake {
          animation: shake 0.3s;
        }
        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </div>
  );
}

/* ===== Spinner ===== */

function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}
