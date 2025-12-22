"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HRSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/hr/dashboard" },
    { name: "Employees", href: "/hr/employees" },
    { name: "Attendance", href: "/hr/attendance" },
    { name: "Reports", href: "/hr/reports" },
    { name: "Leaves", href: "/hr/leaves" },
    
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">Hackersway</h2>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded-lg text-sm ${
              pathname === link.href
                ? "bg-blue-600"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
