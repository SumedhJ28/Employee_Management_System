export default function HRDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          HR Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Company attendance overview
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value="48"
          color="blue"
        />
        <StatCard
          title="Present Today"
          value="42"
          color="green"
        />
        <StatCard
          title="On Leave"
          value="4"
          color="yellow"
        />
        <StatCard
          title="Absent Today"
          value="2"
          color="red"
        />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Leaves */}
        <div className="bg-white border rounded-xl p-4">
          <h2 className="text-lg font-medium mb-4">
            Pending Leave Requests
          </h2>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Sumedh </span>
              <span className="text-gray-500">2 days</span>
            </li>
            <li className="flex justify-between">
              <span>vishal</span>
              <span className="text-gray-500">1 day</span>
            </li>
            <li className="flex justify-between">
              <span>rani manwar</span>
              <span className="text-gray-500">Half Day</span>
            </li>
          </ul>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white border rounded-xl p-4">
          <h2 className="text-lg font-medium mb-4">
            Attendance Summary
          </h2>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              Average Working Hours: <b>7.8 hrs</b>
            </p>
            <p>
              Late Check-ins Today: <b>3</b>
            </p>
            <p>
              Early Check-outs: <b>1</b>
            </p>
          </div>
        </div>
      </div>

      {/* Alerts / Notices */}
      <div className="bg-white border rounded-xl p-4">
        <h2 className="text-lg font-medium mb-4">
          HR Alerts
        </h2>

        <div className="space-y-3 text-sm">
          <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            3 employees have not checked in today
          </div>

          <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
            Monthly attendance report is ready
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===============================
   Reusable Stat Card
================================ */

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: "blue" | "green" | "yellow" | "red";
}) {
  const colors = {
    blue: "border-blue-500",
    green: "border-green-500",
    yellow: "border-yellow-500",
    red: "border-red-500",
  };

  return (
    <div
      className={`bg-white border-l-4 ${colors[color]} rounded-xl p-4`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-1">
        {value}
      </p>
    </div>
  );
}
