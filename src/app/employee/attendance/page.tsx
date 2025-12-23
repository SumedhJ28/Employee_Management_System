"use client";

import { useState } from "react";

/* ================= TYPES ================= */

type AttendanceStatus =
  | "PRESENT"
  | "ABSENT"
  | "LEAVE"
  | "HALF_DAY";

/* ================= CONSTANTS ================= */

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

/* ================= PAGE ================= */

export default function AttendancePage() {
  const daysInMonth = 30; // keep simple & stable

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [filter, setFilter] = useState<AttendanceStatus | "ALL">("ALL");

  /* ================= STATUS LOGIC ================= */

  const getStatus = (day: number): AttendanceStatus => {
    // Mock data only (no weekend logic)
    if ([3, 11].includes(day)) return "LEAVE";
    if ([4].includes(day)) return "HALF_DAY";
    if ([1, 2, 5, 6, 9, 10, 15, 16].includes(day)) return "PRESENT";

    return "ABSENT";
  };

  const getDayStyle = (status: AttendanceStatus) => {
    switch (status) {
      case "PRESENT":
        return "bg-emerald-100 text-emerald-900";
      case "LEAVE":
        return "bg-indigo-100 text-indigo-900";
      case "HALF_DAY":
        return "bg-yellow-100 text-yellow-900";
      case "ABSENT":
        return "bg-red-100 text-red-900";
    }
  };

  const shouldShowDay = (day: number) => {
    if (filter === "ALL") return true;
    return getStatus(day) === filter;
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Attendance
          </h1>
          <p className="text-sm text-gray-500">
            Monthly attendance overview
          </p>
        </div>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          {MONTHS.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap gap-2">
        {["ALL","PRESENT","ABSENT","LEAVE","HALF_DAY"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-3 py-1 rounded-full text-sm border ${
              filter === f
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* ================= CALENDAR ================= */}
      <div className="bg-white border rounded-xl p-4">
        <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const status = getStatus(day);

            if (!shouldShowDay(day)) return <div key={day} />;

            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-16 rounded-lg flex items-center justify-center font-medium cursor-pointer ${getDayStyle(
                  status
                )}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedDay && (
        <AttendanceModal
          day={selectedDay}
          status={getStatus(selectedDay)}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
}

/* ================= MODAL ================= */

function AttendanceModal({
  day,
  status,
  onClose,
}: {
  day: number;
  status: AttendanceStatus;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Attendance Details
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-3 text-sm">
          <Info label="Date" value={`Day ${day}`} />
          <Info label="Status" value={status} />
          <Info label="Check-in Time" value="09:42 AM" />
          <Info label="Check-out Time" value="06:15 PM" />
          <Info label="Working Hours" value="8h 33m" />
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}
