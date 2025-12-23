"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEmployeePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("New Employee:", form);

    // Later → send to backend
    router.push("/hr/employees");
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Add Employee
        </h1>
        <p className="text-sm text-gray-500">
          Create a new employee profile
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 mt-1"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 mt-1"
            placeholder="name@company.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm text-gray-600">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mt-1"
            placeholder="enter phone number"
          />
        </div>

        {/* Role */}
        <div>
          <label className="text-sm text-gray-600">Role</label>
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mt-1"
            placeholder="enter role/designation"
          />
        </div>

        {/* Department */}
        <div>
          <label className="text-sm text-gray-600">Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mt-1"
          >
            <option value="">Select Department</option>
            <option>Development</option>
            <option>Design</option>
            <option>HR</option>
            <option>Testing</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="border px-4 py-2 rounded-md text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
}
