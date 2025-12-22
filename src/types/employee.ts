export interface Employee {
  id: string;
  name: string;
  email: string;
  designation: string;
  department: string;
  role: "EMPLOYEE" | "MANAGER" | "HR_ADMIN" | "SUPER_ADMIN";
}
