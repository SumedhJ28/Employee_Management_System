export default function HREmployeesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Employees
        </h1>
        <p className="text-sm text-gray-500">
          Manage company employees
        </p>
      </div>

      {/* Search + Actions */}
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search employee..."
          className="border rounded-lg px-4 py-2 text-sm w-64"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
          + Add Employee
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Department</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <EmployeeRow
              name="Sumedh "
              role="Software Engineer"
              department="Development"
              status="Active"
            />

            <EmployeeRow
              name="vishal"
              role="UI Designer"
              department="Design"
              status="Active"
            />

            <EmployeeRow
              name="rani manwar"
              role="HR Executive"
              department="HR"
              status="On Leave"
            />

            <EmployeeRow
              name="balirje"
              role="QA Engineer"
              department="Testing"
              status="Inactive"
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

function EmployeeRow({
  name,
  role,
  department,
  status,
}: {
  name: string;
  role: string;
  department: string;
  status: "Active" | "On Leave" | "Inactive";
}) {
  const statusStyle = {
    Active: "bg-green-100 text-green-700",
    "On Leave": "bg-yellow-100 text-yellow-700",
    Inactive: "bg-red-100 text-red-700",
  };

  return (
    <tr>
      <td className="px-4 py-3 font-medium text-gray-800">
        {name}
      </td>
      <td className="px-4 py-3">{role}</td>
      <td className="px-4 py-3">{department}</td>
      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[status]}`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-3 space-x-2">
        <button className="text-blue-600 hover:underline text-sm">
          View
        </button>
        <button className="text-gray-600 hover:underline text-sm">
          Edit
        </button>
      </td>
    </tr>
  );
}
