"use client";

import { useState } from "react";

export default function EmployeeDashboard() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setCheckedIn(true);
    setCheckInTime(now);
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    setCheckInTime(null);
  };

  return (
    <div className="space-y-6">
      {/* Today Status */}
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
            <p className="font-medium text-gray-800">--</p>
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

      {/* Existing Summary Cards (keep below) */}
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-100 border p-6 rounded-xl">
          <p className="text-sm text-slate-600">Present Days</p>
          <p className="text-3xl font-semibold text-slate-800 mt-2">18</p>
        </div>

        <div className="bg-emerald-50 border p-6 rounded-xl">
          <p className="text-sm text-emerald-700">Leaves Taken</p>
          <p className="text-3xl font-semibold text-emerald-900 mt-2">2</p>
        </div>

        <div className="bg-indigo-50 border p-6 rounded-xl">
          <p className="text-sm text-indigo-700">Working Hours</p>
          <p className="text-3xl font-semibold text-indigo-900 mt-2">142</p>
        </div>
      </div>

            {/* Leave Balance */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Leave Balance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Casual Leave */}
          <div className="border border-slate-200 rounded-lg p-4">
            <p className="text-sm text-slate-600">Casual Leave</p>
            <p className="text-2xl font-semibold text-slate-800 mt-1">
              4
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Remaining
            </p>
          </div>

          {/* Sick Leave */}
          <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
            <p className="text-sm text-emerald-700">Sick Leave</p>
            <p className="text-2xl font-semibold text-emerald-900 mt-1">
              2
            </p>
            <p className="text-xs text-emerald-700 mt-1">
              Remaining
            </p>
          </div>

          {/* Unpaid Leave */}
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

        {/* Pending Leave Info */}
        <div className="mt-4 flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            Pending Leave Requests
          </p>
          <span className="text-sm font-semibold text-yellow-900">
            1
          </span>
        </div>
      </div>


            {/* Announcements */}
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
          {/* Announcement 1 */}
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

          {/* Announcement 2 */}
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

          {/* Announcement 3 */}
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
