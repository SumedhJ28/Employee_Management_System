"use client";

import { useState } from "react";

/* ================= TYPES ================= */

interface EmployeeReport {
  name: string;
  present: number;
  absent: number;
  leaves: number;
  hours: number;
}

/* ================= PAGE ================= */

export default function HRReportsPage() {
  const [month, setMonth] = useState("September 2025");
  const [department, setDepartment] = useState("All");

  const employees: EmployeeReport[] = [
    { name: "Sumedh Jadhav", present: 18, absent: 1, leaves: 2, hours: 7.8 },
    { name: "Vishal", present: 17, absent: 2, leaves: 1, hours: 7.4 },
    { name: "Rani", present: 16, absent: 1, leaves: 3, hours: 7.2 },
    { name: "Baliraje", present: 15, absent: 2, leaves: 3, hours: 7.0 },
  ];

  /* ================= KPI CALCULATIONS ================= */

  const totalEmployees = employees.length;
  const totalLeaves = employees.reduce((a, e) => a + e.leaves, 0);

  const avgAttendance = Math.round(
    (employees.reduce((a, e) => a + e.present, 0) /
      (employees.length * 22)) *
      100
  );

  const avgHours = (
    employees.reduce((a, e) => a + e.hours, 0) / employees.length
  ).toFixed(1);

  /* ================= EXPORT ================= */

  const exportCSV = () => {
    const headers = [
      "Employee",
      "Present",
      "Absent",
      "Leaves",
      "Avg Hours",
      "Status",
    ];

    const rows = employees.map((e) => {
      const status =
        e.present >= 18 ? "Excellent" : e.present >= 16 ? "Good" : "Average";

      return [
        e.name,
        e.present,
        e.absent,
        e.leaves,
        e.hours,
        status,
      ];
    });

    const csv =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `attendance_report_${month}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Attendance Reports
        </h1>
        <p className="text-sm text-gray-500">
          Monthly attendance & performance summary
        </p>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Kpi title="Total Employees" value={String(totalEmployees)} />
        <Kpi title="Avg Attendance" value={`${avgAttendance}%`} />
        <Kpi title="Avg Work Hours" value={`${avgHours} hrs`} />
        <Kpi title="Total Leaves" value={String(totalLeaves)} />
      </div>

      {/* ================= FILTERS ================= */}
      <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs text-gray-500">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="block border rounded-md px-3 py-2 text-sm"
          >
            <option>September 2025</option>
            <option>August 2025</option>
            <option>July 2025</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="block border rounded-md px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>Engineering</option>
            <option>HR</option>
            <option>Operations</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
          Generate
        </button>

        <button
          onClick={exportCSV}
          className="border px-4 py-2 rounded-md text-sm hover:bg-gray-50"
        >
          Export CSV
        </button>
      </div>

      {/* ================= PERFORMANCE BARS ================= */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-medium mb-4">
          Employee Attendance Performance
        </h2>

        {employees.map((emp) => {
          const percent = Math.round((emp.present / 22) * 100);

          return (
            <div key={emp.name} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{emp.name}</span>
                <span>{percent}%</span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    percent >= 85
                      ? "bg-green-500"
                      : percent >= 75
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-center">Present</th>
              <th className="px-4 py-3 text-center">Absent</th>
              <th className="px-4 py-3 text-center">Leaves</th>
              <th className="px-4 py-3 text-center">Avg Hours</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {employees.map((emp) => (
              <ReportRow key={emp.name} {...emp} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Kpi({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-1">
        {value}
      </p>
    </div>
  );
}

function ReportRow({
  name,
  present,
  absent,
  leaves,
  hours,
}: EmployeeReport) {
  const status =
    present >= 18 ? "Excellent" : present >= 16 ? "Good" : "Average";

  const statusStyle =
    status === "Excellent"
      ? "bg-green-100 text-green-700"
      : status === "Good"
      ? "bg-blue-100 text-blue-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 font-medium text-gray-800">
        {name}
      </td>
      <td className="px-4 py-3 text-center">{present}</td>
      <td className="px-4 py-3 text-center">{absent}</td>
      <td className="px-4 py-3 text-center">{leaves}</td>
      <td className="px-4 py-3 text-center">{hours} hrs</td>
      <td className="px-4 py-3 text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
