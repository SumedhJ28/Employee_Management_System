"use client";

import { useRouter } from "next/navigation";

export default function HRHeader() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "role=; path=/; max-age=0";
    router.push("/auth/login");
  };

  return (
    <header className="h-14 bg-white border-b px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-800">
        HR Portal
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
