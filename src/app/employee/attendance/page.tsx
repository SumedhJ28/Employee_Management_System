"use client";

import { useState } from "react";

type AttendanceStatus =
  | "PRESENT"
  | "ABSENT"
  | "LEAVE"
  | "HALF_DAY"
  | "WEEKEND";

export default function AttendancePage() {
  const daysInMonth = 30;

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const getStatus = (day: number): AttendanceStatus => {
    if ([7, 14, 21, 28].includes(day)) return "WEEKEND";
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
      case "WEEKEND":
        return "bg-gray-200 text-gray-600";
      case "ABSENT":
        return "bg-red-100 text-red-900";
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Attendance</h1>
        <p className="text-sm text-gray-500">
          Monthly attendance overview
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <Legend color="bg-emerald-100" label="Present" />
        <Legend color="bg-red-100" label="Absent" />
        <Legend color="bg-yellow-100" label="Half Day" />
        <Legend color="bg-indigo-100" label="Leave" />
        <Legend color="bg-gray-200" label="Weekend" />
      </div>

      {/* Calendar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const status = getStatus(day);

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

      {/* Modal */}
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
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
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
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-4 h-4 rounded ${color}`} />
      <span>{label}</span>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}
