"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Employee = {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: string;
};

export default function HREditEmployeePage() {
  const params = useParams();
  const id = params?.id as string;

  // Mock DB
  const EMPLOYEES: Record<string, Employee> = {
    "1": {
      name: "Sumedh",
      email: "sumedh@hackersway.com",
      phone: "9999999999",
      department: "Engineering",
      role: "Software Engineer",
      status: "Active",
    },
    "2": {
      name: "Vishal",
      email: "vishal@hackersway.com",
      phone: "8888888888",
      department: "Engineering",
      role: "Frontend Developer",
      status: "Active",
    },
    "3": {
      name: "Rani",
      email: "rani@hackersway.com",
      phone: "7777777777",
      department: "HR",
      role: "HR Executive",
      status: "Active",
    },
  };

  const [form, setForm] = useState<Employee | null>(null);

  // Load employee safely
  useEffect(() => {
    if (id && EMPLOYEES[id]) {
      setForm(EMPLOYEES[id]);
    }
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    console.log("Updated employee:", id, form);
    alert("Employee updated successfully ✅");
  }

  if (!form) {
    return (
      <div className="text-gray-600">
        Loading employee profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Edit Employee
        </h1>
        <p className="text-sm text-gray-500">
          Employee ID: {id}
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border rounded-xl p-6 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
            {form.name.charAt(0)}
          </div>
          <button className="text-sm text-blue-600 hover:underline">
            Change Photo
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />

          <Select
            label="Department"
            name="department"
            value={form.department}
            options={["Engineering", "HR", "Finance"]}
            onChange={handleChange}
          />

          <Select
            label="Role"
            name="role"
            value={form.role}
            options={["Software Engineer", "Frontend Developer", "HR Executive", "Intern"]}
            onChange={handleChange}
          />

          <Select
            label="Status"
            name="status"
            value={form.status}
            options={["Active", "Inactive"]}
            onChange={handleChange}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button className="border px-4 py-2 rounded-md text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Reusable ===== */

function Input({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
