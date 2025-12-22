import React from "react";
import EmployeeSidebar from "../../components/layout/EmployeeSidebar";
import EmployeeHeader from "../../components/layout/EmployeeHeader";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <EmployeeSidebar />

      <div className="flex flex-col flex-1">
        <EmployeeHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
