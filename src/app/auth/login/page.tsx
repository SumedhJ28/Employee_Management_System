"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"employee" | "hr">("employee");
  const [error, setError] = useState("");

  const handleLogin = () => {
  setError("");

  if (!email || !password) {
    setError("Please enter email and password");
    return;
  }

  // TEMP: store role in cookie
  document.cookie = `role=${role}; path=/`;

  if (role === "hr") {
    router.push("/hr/dashboard");
  } else {
    router.push("/employee/dashboard");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Company Login
          </h1>
          <p className="text-sm text-gray-500">
            Sign in to continue
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full border rounded-lg px-4 py-2 text-sm"
            value={role}
            onChange={(e) =>
              setRole(e.target.value as "employee" | "hr")
            }
          >
            <option value="employee">Employee</option>
            <option value="hr">HR</option>
          </select>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
