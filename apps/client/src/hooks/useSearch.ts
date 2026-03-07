import { useMemo, useState } from "react"
import { useStudentStore } from "@/store/useStudentStore"

export function useSearchStudents() {
  const students = useStudentStore((state) => state.students)
  
  const [searchQuery, setSearchQuery] = useState("")

  const filteredStudents = useMemo(() => {
    let result = [...students]

    // Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query)
      )
    }

    return result
  }, [students, searchQuery])

  return {
    students,           // Original data
    filteredStudents,   // Filtered data
    searchQuery,
    setSearchQuery,
    totalCount: students.length,
    filteredCount: filteredStudents.length,
  }
}
