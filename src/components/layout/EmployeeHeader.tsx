"use client";

export default function EmployeeHeader() {
  const handleLogout = () => {
    // Clear auth cookie
    document.cookie = "role=; path=/; max-age=0";

    // ✅ FINAL login route
    window.location.href = "/login";
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
