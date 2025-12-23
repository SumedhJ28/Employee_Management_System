"use client";

import { useState } from "react";

export default function EmployeeProfile() {
  const [profile, setProfile] = useState({
    name: "Sumedh Jadhav",
    email: "sumedh@hackersway.com",
    phone: "9999999999",
    department: "Engineering",
    role: "Software Engineer",
    active: true,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    console.log("Updated profile:", profile);
    alert("Profile updated successfully ✅");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white border rounded-xl p-6 space-y-6">

        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
            SJ
          </div>

          <button className="border px-4 py-2 rounded-md text-sm">
            Change Photo
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Input label="Full Name" name="name" value={profile.name} onChange={handleChange} />
          <Input label="Email" name="email" value={profile.email} onChange={handleChange} />
          <Input label="Phone" name="phone" value={profile.phone} onChange={handleChange} />

          <div>
            <label className="text-sm text-gray-500">Department</label>
            <select
              name="department"
              value={profile.department}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option>Engineering</option>
              <option>HR</option>
              <option>Finance</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Role</label>
            <input
              name="role"
              value={profile.role}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

        </div>

        {/* Status */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Status</span>
          <span
            className={`px-3 py-1 rounded-full text-xs ${
              profile.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {profile.active ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

/* Reusable Input */
function Input({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
}) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md px-3 py-2"
      />
    </div>
  );
}
