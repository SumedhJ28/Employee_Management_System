"use client";

import { useState } from "react";

/* ================= TYPES ================= */

type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";
type LeaveType = "CASUAL" | "SICK" | "UNPAID";

interface Leave {
  id: number;
  type: LeaveType;
  from: string;
  to: string;
  reason: string;
  status: LeaveStatus;
}

/* ================= PAGE ================= */

export default function EmployeeLeavesPage() {
  const [showModal, setShowModal] = useState(false);

  // Mock leave balance
  const leaveBalance = {
    CASUAL: 4,
    SICK: 2,
    UNPAID: "∞",
  };

  // Mock leave history
  const [leaves, setLeaves] = useState<Leave[]>([
    {
      id: 1,
      type: "CASUAL",
      from: "2025-09-10",
      to: "2025-09-11",
      reason: "Personal work",
      status: "APPROVED",
    },
    {
      id: 2,
      type: "SICK",
      from: "2025-09-18",
      to: "2025-09-18",
      reason: "Fever",
      status: "PENDING",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Leaves
          </h1>
          <p className="text-sm text-gray-500">
            Apply and track your leave requests
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
        >
          + Apply Leave
        </button>
      </div>

      {/* ================= LEAVE BALANCE ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <BalanceCard label="Casual Leave" value={leaveBalance.CASUAL} />
        <BalanceCard label="Sick Leave" value={leaveBalance.SICK} />
        <BalanceCard label="Unpaid Leave" value={leaveBalance.UNPAID} />
      </div>

      {/* ================= LEAVE HISTORY ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="p-3">Type</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id} className="border-t">
                <td className="p-3">{leave.type}</td>
                <td className="p-3">{leave.from}</td>
                <td className="p-3">{leave.to}</td>
                <td className="p-3">{leave.reason}</td>
                <td className="p-3">
                  <StatusBadge status={leave.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {leaves.length === 0 && (
          <p className="text-center text-sm text-gray-500 py-6">
            No leave records found
          </p>
        )}
      </div>

      {/* ================= APPLY LEAVE MODAL ================= */}
      {showModal && (
        <ApplyLeaveModal
          onClose={() => setShowModal(false)}
          onSubmit={(newLeave) => {
            setLeaves((prev) => [
              ...prev,
              { ...newLeave, id: prev.length + 1 },
            ]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function BalanceCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-800 mt-1">
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1">Remaining</p>
    </div>
  );
}

function StatusBadge({ status }: { status: LeaveStatus }) {
  const styles = {
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

/* ================= MODAL ================= */

function ApplyLeaveModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (leave: Omit<Leave, "id" | "status"> & { status: LeaveStatus }) => void;
}) {
  const [type, setType] = useState<LeaveType>("CASUAL");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!from || !to || !reason) return;

    onSubmit({
      type,
      from,
      to,
      reason,
      status: "PENDING",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Apply Leave
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4 text-sm">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as LeaveType)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="CASUAL">Casual Leave</option>
            <option value="SICK">Sick Leave</option>
            <option value="UNPAID">Unpaid Leave</option>
          </select>

          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
