import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StudentTable from "@/components/features/StudentTable";
import { Plus, Search, Download } from "lucide-react";
import { useMemo, useState } from "react";
import { useStudentStore } from "@/store/useStudentStore";
import StatCard from "@/components/features/cards/StatCard";
import StudentForm from "@/components/features/StudentForm";
import { useSearchStudents } from "@/hooks/useSearch";
import { useExportData } from "@/hooks/useExportData";
import ExportSelectionModel from "@/components/features/dailogs/ExportSelectionModel";

function StudentManagement() {
  const [createModelOpen, setCreateModelOpen] = useState<boolean>(false);
  const students = useStudentStore((state) => state.students);
  
  const { filteredStudents, searchQuery, setSearchQuery } = useSearchStudents();
  
  const [exportDialogOpen, setExportDialogOpen] = useState(false)

  
  const { exportFile } = useExportData();

  // Compute dynamic stats from students data
  const statsData = useMemo(() => {
    const totalStudents = students.length;

    const averageAge =
      totalStudents > 0
        ? (
            students.reduce((sum, student) => sum + student.age, 0) /
            totalStudents
          ).toFixed(1)
        : "0";

    // Count students added this month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthCount = students.filter((student) => {
      if (!student.enrolledDate) return false;
      const enrolledDate = new Date(student.enrolledDate);
      return (
        enrolledDate.getMonth() === currentMonth &&
        enrolledDate.getFullYear() === currentYear
      );
    }).length;

    return [
      {
        title: "Total Students",
        value: totalStudents.toString(),
      },
      {
        title: "Average Age",
        value: averageAge,
      },
      {
        title: "This Month",
        value: thisMonthCount > 0 ? `+${thisMonthCount}` : "0",
        color: thisMonthCount > 0 ? "text-green-600" : undefined,
      },
    ];
  }, [students]);
  

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <Button variant="outline"  className="h-10 cursor-pointer" onClick={() => setExportDialogOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="h-10 cursor-pointer" onClick={() => setCreateModelOpen(!createModelOpen)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">7</span> of{" "}
            <span className="font-medium text-foreground">7</span> students
          </p>
        </div>

        {/* Table */}
        <StudentTable students={filteredStudents} />
      </main>
      
      {createModelOpen && (
        <StudentForm 
        open={createModelOpen}
        onOpenChange={setCreateModelOpen}
        initialData={null}
        isLoading={false}
        />
      )}
      
      {/* Export Dialog */}
            <ExportSelectionModel 
              open={exportDialogOpen} 
              onOpenChange={setExportDialogOpen} 
            />
    </div>
  );
}

export default StudentManagement;
