"use client";

import { useState } from "react";

/* ================= TYPES ================= */

type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";
type LeaveType = "CASUAL" | "SICK" | "UNPAID";

interface LeaveRequest {
  id: number;
  employee: string;
  type: LeaveType;
  from: string;
  to: string;
  reason: string;
  status: LeaveStatus;
}

/* ================= PAGE ================= */

export default function HRLeavesPage() {
  const [filter, setFilter] = useState<LeaveStatus | "ALL">("ALL");

  const [leaves, setLeaves] = useState<LeaveRequest[]>([
    {
      id: 1,
      employee: "Rani",
      type: "SICK",
      from: "2025-09-18",
      to: "2025-09-18",
      reason: "Fever",
      status: "PENDING",
    },
    {
      id: 2,
      employee: "Baliraje",
      type: "CASUAL",
      from: "2025-09-20",
      to: "2025-09-21",
      reason: "Family function",
      status: "PENDING",
    },
    {
      id: 3,
      employee: "Sumedh",
      type: "CASUAL",
      from: "2025-09-05",
      to: "2025-09-05",
      reason: "Personal work",
      status: "APPROVED",
    },
  ]);

  const filteredLeaves =
    filter === "ALL"
      ? leaves
      : leaves.filter((l) => l.status === filter);

  const updateStatus = (id: number, status: LeaveStatus) => {
    setLeaves((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status } : l
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Leave Requests
        </h1>
        <p className="text-sm text-gray-500">
          Review and manage employee leave requests
        </p>
      </div>

      {/* ================= FILTER ================= */}
      <div className="flex gap-2">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s as any)}
            className={`px-4 py-1 rounded-full text-sm border ${
              filter === s
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* ================= LEAVE TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave.id} className="border-t">
                <td className="p-3 font-medium text-gray-800">
                  {leave.employee}
                </td>
                <td className="p-3">{leave.type}</td>
                <td className="p-3">{leave.from}</td>
                <td className="p-3">{leave.to}</td>
                <td className="p-3">{leave.reason}</td>
                <td className="p-3">
                  <StatusBadge status={leave.status} />
                </td>
                <td className="p-3">
                  {leave.status === "PENDING" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateStatus(leave.id, "APPROVED")
                        }
                        className="text-xs px-3 py-1 bg-green-600 text-white rounded-lg"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(leave.id, "REJECTED")
                        }
                        className="text-xs px-3 py-1 bg-red-600 text-white rounded-lg"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeaves.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-6">
            No leave requests found
          </p>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatusBadge({ status }: { status: LeaveStatus }) {
  const styles: Record<LeaveStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
