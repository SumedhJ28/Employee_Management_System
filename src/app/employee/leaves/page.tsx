"use client";

import { useState } from "react";

type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED";

interface LeaveRequest {
  id: number;
  type: string;
  from: string;
  to: string;
  reason: string;
  status: LeaveStatus;
}

export default function LeavesPage() {
  const [leaveType, setLeaveType] = useState("Casual Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const leaveHistory: LeaveRequest[] = [
    {
      id: 1,
      type: "Casual Leave",
      from: "10 Sep 2025",
      to: "11 Sep 2025",
      reason: "Personal work",
      status: "APPROVED",
    },
    {
      id: 2,
      type: "Sick Leave",
      from: "18 Sep 2025",
      to: "18 Sep 2025",
      reason: "Fever",
      status: "PENDING",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Leave Management
        </h1>
        <p className="text-sm text-gray-500">
          Apply and track your leave requests
        </p>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Apply Leave */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Apply Leave
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Leave Type"
              type="select"
              value={leaveType}
              onChange={setLeaveType}
              options={["Casual Leave", "Sick Leave", "Unpaid Leave"]}
            />

            <Input
              label="From Date"
              type="date"
              value={fromDate}
              onChange={setFromDate}
            />

            <Input
              label="To Date"
              type="date"
              value={toDate}
              onChange={setToDate}
            />

            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                rows={3}
                placeholder="Enter reason"
              />
            </div>
          </div>

          <div className="mt-4 text-right">
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700">
              Submit Request
            </button>
          </div>
        </div>

        {/* Leave Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Leave Summary
          </h2>

          <SummaryItem label="Casual Leave" value="4 remaining" />
          <SummaryItem label="Sick Leave" value="2 remaining" />
          <SummaryItem label="Pending Requests" value="1" highlight />
        </div>
      </div>

      {/* Leave History */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Leave History
        </h2>

        <div className="space-y-3">
          {leaveHistory.map((leave) => (
            <div
              key={leave.id}
              className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {leave.type}
                </p>
                <p className="text-sm text-gray-500">
                  {leave.from} → {leave.to}
                </p>
                <p className="text-sm text-gray-600">
                  {leave.reason}
                </p>
              </div>

              <StatusBadge status={leave.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Input({
  label,
  type,
  value,
  onChange,
  options,
}: any) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      {type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
        >
          {options.map((opt: string) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
        />
      )}
    </div>
  );
}

function SummaryItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-3 rounded-lg border ${
        highlight
          ? "bg-yellow-50 border-yellow-200"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: LeaveStatus }) {
  const styles = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-emerald-100 text-emerald-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${styles[status]}`}
    >
      {status}
    </span>
  );
}
