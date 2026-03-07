import type { Student } from '@/types/types'
import { create } from 'zustand'

interface StudentStore {
  students: Student[],
  setStudents: (students: Student[]) => void,
  addStudent: (student: Student) => void,
  removeStudent: (id: number) => void,
  updateStudent: (id: number, student: Student) => void,
}

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],
  setStudents: (students: Student[]) => set(() => ({ students })),
  addStudent: (student: Student) => set((state) => ({ students: [...state.students, student] })),
  removeStudent: (id: number) => set((state) => ({ students: state.students.filter((student) => student.id !== id) })),
  updateStudent: (id: number, student: Student) => set((state) => ({ students: state.students.map((s) => s.id === id ? student : s) }))
}));