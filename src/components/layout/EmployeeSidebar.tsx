"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EmployeeSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/employee/dashboard" },
    { name: "Attendance", href: "/employee/attendance" },
    { name: "Leaves", href: "/employee/leaves" },
    { name: "Profile", href: "/employee/profile" },
  ];

  return (
    <aside className="w-64 bg-gray-900 min-h-screen p-4 text-white">
      <h2 className="text-xl font-bold mb-6">Hackersway</h2>

      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-2 rounded-lg text-sm font-medium no-underline
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
