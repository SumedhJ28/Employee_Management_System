"use client";

/* ================= TYPES ================= */

// ✅ Single source of truth
type AttendanceStatus = "PRESENT" | "ABSENT" | "LEAVE";

interface TodayAttendance {
  name: string;
  status: AttendanceStatus;
  time: string;
}

/* ================= PAGE ================= */

export default function HRDashboardPage() {
  // Mock stats
  const stats = {
    totalEmployees: 4,
    present: 2,
    absent: 1,
    onLeave: 1,
  };

  // ✅ TYPED DATA (IMPORTANT FIX)
  const todayAttendance: TodayAttendance[] = [
    { name: "Sumedh", status: "PRESENT", time: "09:12 AM" },
    { name: "Vishal", status: "PRESENT", time: "09:20 AM" },
    { name: "Rani", status: "LEAVE", time: "--" },
    { name: "Baliraje", status: "ABSENT", time: "--" },
  ];

  const pendingLeaves = [
    { name: "Rani", type: "Sick Leave", days: "1 Day" },
    { name: "Baliraje", type: "Casual Leave", days: "2 Days" },
  ];

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          HR Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of today’s attendance & actions
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Employees" value={stats.totalEmployees} />
        <StatCard label="Present Today" value={stats.present} color="green" />
        <StatCard label="Absent Today" value={stats.absent} color="red" />
        <StatCard label="On Leave" value={stats.onLeave} color="yellow" />
      </div>

      {/* ================= TODAY ATTENDANCE ================= */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Today’s Attendance
        </h2>

        <div className="space-y-3">
          {todayAttendance.map((emp) => (
            <div
              key={emp.name}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div>
                <p className="font-medium text-gray-800">{emp.name}</p>
                <p className="text-xs text-gray-500">
                  Check-in: {emp.time}
                </p>
              </div>

              {/* ✅ NO TS ERROR NOW */}
              <StatusBadge status={emp.status} />
            </div>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Leaves */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Pending Leave Requests
          </h2>

          {pendingLeaves.map((leave, i) => (
            <div
              key={i}
              className="flex items-center justify-between border rounded-lg p-3 mb-3"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {leave.name}
                </p>
                <p className="text-xs text-gray-500">
                  {leave.type} · {leave.days}
                </p>
              </div>

              <button className="text-sm text-indigo-600 hover:underline">
                Review
              </button>
            </div>
          ))}

          {pendingLeaves.length === 0 && (
            <p className="text-sm text-gray-500">
              No pending requests
            </p>
          )}
        </div>

        {/* Alerts */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            System Alerts
          </h2>

          <div className="space-y-3 text-sm">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              ⚠️ 3 employees have not checked in yet
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
              ℹ️ Attendance policy updated last week
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              ✅ Payroll data synced successfully
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: "green" | "red" | "yellow";
}) {
  const colorMap = {
    green: "bg-green-50 text-green-800",
    red: "bg-red-50 text-red-800",
    yellow: "bg-yellow-50 text-yellow-800",
  };

  return (
    <div className={`border rounded-xl p-6 ${color ? colorMap[color] : ""}`}>
      <p className="text-sm">{label}</p>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: AttendanceStatus }) {
  const styles: Record<AttendanceStatus, string> = {
    PRESENT: "bg-green-100 text-green-800",
    ABSENT: "bg-red-100 text-red-800",
    LEAVE: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
