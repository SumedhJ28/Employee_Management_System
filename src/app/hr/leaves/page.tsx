export default function HRLeaveApprovalPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Leave Approvals
        </h1>
        <p className="text-sm text-gray-500">
          Review and manage employee leave requests
        </p>
      </div>

      {/* Leave Requests */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Employee</th>
              <th className="text-left px-4 py-3">Leave Type</th>
              <th className="text-left px-4 py-3">Duration</th>
              <th className="text-left px-4 py-3">Dates</th>
              <th className="text-left px-4 py-3">Reason</th>
              <th className="text-left px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <LeaveRow
              name="Sumedh Jadhav"
              type="Casual Leave"
              duration="2 Days"
              dates="12 Sep – 13 Sep"
              reason="Personal work"
            />

            <LeaveRow
              name="baliraje"
              type="Sick Leave"
              duration="1 Day"
              dates="14 Sep"
              reason="Fever"
            />

            <LeaveRow
              name="vishal"
              type="Half Day"
              duration="Half Day"
              dates="15 Sep"
              reason="Doctor appointment"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===============================
   Leave Row Component
================================ */

function LeaveRow({
  name,
  type,
  duration,
  dates,
  reason,
}: {
  name: string;
  type: string;
  duration: string;
  dates: string;
  reason: string;
}) {
  return (
    <tr>
      <td className="px-4 py-3 font-medium text-gray-800">
        {name}
      </td>
      <td className="px-4 py-3">{type}</td>
      <td className="px-4 py-3">{duration}</td>
      <td className="px-4 py-3">{dates}</td>
      <td className="px-4 py-3 text-gray-600">{reason}</td>
      <td className="px-4 py-3 space-x-2">
        <button className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700">
          Approve
        </button>
        <button className="bg-red-600 text-white px-3 py-1 rounded-md text-xs hover:bg-red-700">
          Reject
        </button>
      </td>
    </tr>
  );
}
