import { type Student } from "@/types/types"

export function exportToExcel(students: Student[], filename: string = "students") {
  // Create CSV content (Excel can open CSV files)
  const headers = ["Name", "Email", "Age"]
  const rows = students.map((student) => [
    student.name,
    student.email,
    student.age.toString(),
  ])

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n")

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
