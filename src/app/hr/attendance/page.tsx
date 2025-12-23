"use client";

import { useState } from "react";

/* ================= TYPES ================= */

type AttendanceStatus = "PRESENT" | "ABSENT" | "LEAVE" | "HALF_DAY";

interface AttendanceRecord {
  id: number;
  name: string;
  status: AttendanceStatus;
  checkIn: string;
  checkOut: string;
  hours: string;
}

/* ================= PAGE ================= */

export default function HRAttendancePage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filter, setFilter] = useState<AttendanceStatus | "ALL">("ALL");

  const attendanceData: AttendanceRecord[] = [
    {
      id: 1,
      name: "Sumedh",
      status: "PRESENT",
      checkIn: "09:12 AM",
      checkOut: "06:05 PM",
      hours: "8h 53m",
    },
    {
      id: 2,
      name: "Vishal",
      status: "PRESENT",
      checkIn: "09:25 AM",
      checkOut: "06:10 PM",
      hours: "8h 45m",
    },
    {
      id: 3,
      name: "Rani",
      status: "LEAVE",
      checkIn: "--",
      checkOut: "--",
      hours: "--",
    },
    {
      id: 4,
      name: "Baliraje",
      status: "ABSENT",
      checkIn: "--",
      checkOut: "--",
      hours: "--",
    },
  ];

  const filteredData =
    filter === "ALL"
      ? attendanceData
      : attendanceData.filter((r) => r.status === filter);

  /* ================= EXPORT LOGIC ================= */

  const exportCSV = () => {
    const headers = [
      "Employee",
      "Status",
      "Check In",
      "Check Out",
      "Working Hours",
    ];

    const rows = filteredData.map((r) => [
      r.name,
      r.status,
      r.checkIn,
      r.checkOut,
      r.hours,
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute(
      "download",
      `attendance_${selectedDate}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Attendance
          </h1>
          <p className="text-sm text-gray-500">
            Daily employee attendance overview
          </p>
        </div>

        {/* Export Button */}
        <button
          onClick={exportCSV}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
        >
          Export CSV
        </button>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value as AttendanceStatus | "ALL"
              )
            }
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="ALL">All</option>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
            <option value="LEAVE">Leave</option>
            <option value="HALF_DAY">Half Day</option>
          </select>
        </div>
      </div>

      {/* ================= ATTENDANCE TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Check-In</th>
              <th className="p-3 text-left">Check-Out</th>
              <th className="p-3 text-left">Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-3 font-medium text-gray-800">
                  {row.name}
                </td>
                <td className="p-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="p-3">{row.checkIn}</td>
                <td className="p-3">{row.checkOut}</td>
                <td className="p-3">{row.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-6">
            No attendance records found
          </p>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatusBadge({ status }: { status: AttendanceStatus }) {
  const styles: Record<AttendanceStatus, string> = {
    PRESENT: "bg-green-100 text-green-800",
    ABSENT: "bg-red-100 text-red-800",
    LEAVE: "bg-yellow-100 text-yellow-800",
    HALF_DAY: "bg-indigo-100 text-indigo-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
