import HRSidebar from "../../components/layout/HRSidebar";
import HRHeader from "../../components/layout/HRHeader";
import React from "react";

export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <HRSidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <HRHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
