"use client";

import { JSX, useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  }, [email, password, forgot]);

  /* 🔐 REAL LOGIN */
  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    // ✅ NECESSARY FIX (do not remove)
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }

      const data = await res.json();
      console.log("ROLE FROM BACKEND:", data.role);

      // Save authenticated values
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role);

      const role = String(data.role).toUpperCase();

      if (role === "HR") {
        window.location.href = "/hr/dashboard";
      } else if (role === "EMPLOYEE") {
        window.location.href = "/employee/dashboard";
      } else {
        setError("Unauthorized role");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* 🔁 Forgot password (UI only for now) */
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

          <button
            onClick={() => setDark(!dark)}
            className="text-sm border rounded-full px-3 py-1"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-500 animate-shake">
            {error}
          </div>
        )}

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
              <p className="text-sm text-green-500">Reset link sent!</p>
            )}

            <button
              onClick={() => setForgot(false)}
              className="text-xs opacity-70"
            >
              ← Back to login
            </button>
          </div>
        ) : (
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
        )}
      </div>

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

function Spinner(): JSX.Element {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );
}
