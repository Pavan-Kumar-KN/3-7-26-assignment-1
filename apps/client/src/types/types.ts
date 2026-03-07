export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  status?: "active" | "inactive" | "graduated";
  enrolledDate?: string;
}

export interface StudentFormData {
  name: string
  email: string
  age: string
}
