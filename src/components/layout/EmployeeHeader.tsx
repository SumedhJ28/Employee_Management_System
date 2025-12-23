"use client";

import { useRouter } from "next/navigation";

export default function EmployeeHeader() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth cookie
    document.cookie = "role=; path=/; max-age=0";

    // Redirect to login
    router.push("/auth/login");
  };

  return (
    <header className="h-14 bg-white border-b px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-800">
        Employee Portal
      </h1>

      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </header>
  );
}
