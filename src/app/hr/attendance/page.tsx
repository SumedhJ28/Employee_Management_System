export default function HRAttendancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Attendance
        </h1>
        <p className="text-sm text-gray-500">
          Daily employee attendance records
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <input
          type="date"
          className="border rounded-lg px-3 py-2 text-sm"
        />

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Present</option>
          <option>Late</option>
          <option>Absent</option>
          <option>On Leave</option>
        </select>
      </div>

      {/* Attendance Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Employee</th>
              <th className="text-left px-4 py-3">Check-in</th>
              <th className="text-left px-4 py-3">Check-out</th>
              <th className="text-left px-4 py-3">Working Hours</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <AttendanceRow
              name="Sumedh "
              checkIn="09:12 AM"
              checkOut="06:14 PM"
              hours="8h 45m"
              status="Present"
            />

            <AttendanceRow
              name="vishal"
              checkIn="09:48 AM"
              checkOut="06:05 PM"
              hours="7h 55m"
              status="Late"
            />

            <AttendanceRow
              name="rani manwar"
              checkIn="--"
              checkOut="--"
              hours="--"
              status="On Leave"
            />

            <AttendanceRow
              name="baliraje"
              checkIn="--"
              checkOut="--"
              hours="--"
              status="Absent"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===============================
   Row Component
================================ */

function AttendanceRow({
  name,
  checkIn,
  checkOut,
  hours,
  status,
}: {
  name: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: "Present" | "Late" | "Absent" | "On Leave";
}) {
  const statusStyle = {
    Present: "bg-green-100 text-green-700",
    Late: "bg-yellow-100 text-yellow-700",
    Absent: "bg-red-100 text-red-700",
    "On Leave": "bg-blue-100 text-blue-700",
  };

  return (
    <tr>
      <td className="px-4 py-3 font-medium text-gray-800">
        {name}
      </td>
      <td className="px-4 py-3">{checkIn}</td>
      <td className="px-4 py-3">{checkOut}</td>
      <td className="px-4 py-3">{hours}</td>
      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[status]}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
