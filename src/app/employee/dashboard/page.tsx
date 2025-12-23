"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ============================
   CONSTANTS (NEW)
============================ */
const DAILY_TARGET_MINUTES = 8 * 60;

export default function EmployeeDashboard() {
  const router = useRouter();

  /* ============================
     ORIGINAL STATE (KEPT)
  ============================ */
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  /* ============================
     NEW STATE (ADDED – LOGIC ONLY)
  ============================ */
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [workingMinutes, setWorkingMinutes] = useState(0);

  /* ============================
     ORIGINAL HANDLERS (ENHANCED)
  ============================ */
  const handleCheckIn = () => {
    const now = new Date();

    const displayTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setCheckedIn(true);
    setCheckInTime(displayTime);   // original UI
    setCheckInDate(now);           // new logic
    setWorkingMinutes(0);
  };

  const handleCheckOut = () => {
    if (!checkInDate) return;

    const now = new Date();
    const diffMs = now.getTime() - checkInDate.getTime();
    const minutes = Math.floor(diffMs / (1000 * 60));

    setWorkingMinutes(minutes);
    setCheckedIn(false);
  };

  /* ============================
     DERIVED VALUES (NEW)
  ============================ */
  const hours = Math.floor(workingMinutes / 60);
  const minutes = workingMinutes % 60;

  const progress = Math.min(
    (workingMinutes / DAILY_TARGET_MINUTES) * 100,
    100
  );

  return (
    <div className="space-y-6">
      {/* ============================
          TODAY STATUS (ORIGINAL + ENHANCED)
      ============================ */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Today</p>
            <h2 className="text-lg font-semibold text-gray-800">
              Attendance Status
            </h2>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              checkedIn
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {checkedIn ? "Checked In" : "Not Checked In"}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Check-In Time</p>
            <p className="font-medium text-gray-800">
              {checkInTime ?? "--"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Working Hours</p>
            <p className="font-medium text-gray-800">
              {workingMinutes > 0 ? `${hours}h ${minutes}m` : "--"}
            </p>

            {/* 🔹 Progress Bar (NEW) */}
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-indigo-600 rounded"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Target: 8 hours
              </p>
            </div>
          </div>

          <div className="flex items-end">
            {!checkedIn ? (
              <button
                onClick={handleCheckIn}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Check In
              </button>
            ) : (
              <button
                onClick={handleCheckOut}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
              >
                Check Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ============================
          TODAY TIMELINE (NEW)
      ============================ */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Today Timeline
        </h3>

        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span>
              Checked In at <strong>{checkInTime ?? "--"}</strong>
            </span>
          </li>

          <li className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                checkedIn ? "bg-yellow-400" : "bg-gray-300"
              }`}
            />
            <span>
              {checkedIn ? "Working..." : "Work completed"}
            </span>
          </li>
        </ul>
      </div>

      {/* ============================
          SUMMARY CARDS (ORIGINAL + CLICKABLE)
      ============================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => router.push("/employee/attendance")}
          className="cursor-pointer bg-slate-100 border p-6 rounded-xl hover:shadow"
        >
          <p className="text-sm text-slate-600">Present Days</p>
          <p className="text-3xl font-semibold text-slate-800 mt-2">18</p>
        </div>

        <div
          onClick={() => router.push("/employee/leaves")}
          className="cursor-pointer bg-emerald-50 border p-6 rounded-xl hover:shadow"
        >
          <p className="text-sm text-emerald-700">Leaves Taken</p>
          <p className="text-3xl font-semibold text-emerald-900 mt-2">2</p>
        </div>

        <div className="bg-indigo-50 border p-6 rounded-xl">
          <p className="text-sm text-indigo-700">Working Hours</p>
          <p className="text-3xl font-semibold text-indigo-900 mt-2">
            142
          </p>
        </div>
      </div>

      {/* ============================
          LEAVE BALANCE (100% ORIGINAL)
      ============================ */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Leave Balance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600">Casual Leave</p>
            <p className="text-2xl font-semibold text-slate-800 mt-1">
              4
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Remaining
            </p>
          </div>

          <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
            <p className="text-sm text-emerald-700">Sick Leave</p>
            <p className="text-2xl font-semibold text-emerald-900 mt-1">
              2
            </p>
            <p className="text-xs text-emerald-700 mt-1">
              Remaining
            </p>
          </div>

          <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">Unpaid Leave</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">
              ∞
            </p>
            <p className="text-xs text-gray-600 mt-1">
              As applicable
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            Pending Leave Requests
          </p>
          <span className="text-sm font-semibold text-yellow-900">
            1
          </span>
        </div>
      </div>

      {/* ============================
          ANNOUNCEMENTS (100% ORIGINAL)
      ============================ */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Announcements
          </h2>
          <span className="text-sm text-gray-500">
            Latest updates
          </span>
        </div>

        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 bg-indigo-50 p-4 rounded">
            <p className="text-sm font-semibold text-indigo-800">
              Office Closed – Gandhi Jayanti
            </p>
            <p className="text-sm text-indigo-700 mt-1">
              Office will remain closed on 2nd October due to Gandhi Jayanti.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Posted by HR · 28 Sep 2025
            </p>
          </div>

          <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4 rounded">
            <p className="text-sm font-semibold text-emerald-800">
              New Attendance Policy
            </p>
            <p className="text-sm text-emerald-700 mt-1">
              Updated attendance rules are now live. Please review them carefully.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Posted by Admin · 20 Sep 2025
            </p>
          </div>

          <div className="border-l-4 border-gray-400 bg-gray-50 p-4 rounded">
            <p className="text-sm font-semibold text-gray-800">
              Team Meeting Reminder
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Monthly team meeting scheduled for Friday at 4:00 PM.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Posted by Manager · 18 Sep 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
