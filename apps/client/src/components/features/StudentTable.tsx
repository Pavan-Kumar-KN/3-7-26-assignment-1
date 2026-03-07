import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useStudentStore } from "@/store/useStudentStore";
import { useState } from "react";
import { DeleteConfirmDialog } from "@/components/features/dailogs/DeleteConfirmDialog";
import type { Student } from "@/types/types";
import { StudentTableSkeleton } from "./StudentTableSkeleton";
import StudentForm from "@/components/features/StudentForm";

interface StudentTableProps {
  students: Student[];
}

function StudentTable({ students }: StudentTableProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [updateModel, setUpdateModel] = useState<boolean>(false);
  
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined,
  );

  const { removeStudent } = useStudentStore((state) => state);

  const handleEdit = (id: number) => {
    setUpdateModel(!updateModel);
    
    const tempStudent: Student = students.find((student) => student.id === id);
    setSelectedStudent(tempStudent);
  };

  const handleDelete = (id: number) => {
    setOpen(!open);
    const tempStudent = students.find((student) => student.id === id);
    setSelectedStudent(tempStudent);
  };

  if (students.length <= 0) {
    return (
      <>
        <StudentTableSkeleton />
      </>
    );
  }

  return (
    <div>
      <Table className="border border-muted">
        <TableHeader className="bg-accent">
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>No students found</TableRow>
          ) : (
            <>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEdit(Number(student.id))}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDelete(Number(student.id))}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {selectedStudent && (
        <DeleteConfirmDialog
          open={open}
          onOpenChange={() => setOpen(!open)}
          onSubmit={() => removeStudent(selectedStudent.id)}
          studentName={selectedStudent.name}
        />
      )}
      
      {
        updateModel && (
          <StudentForm
            open={updateModel}
            onOpenChange={() => setUpdateModel(!updateModel)}
            initialData={selectedStudent}
            isLoading={false}
          />
        )
      }
    </div>
  );
}

export default StudentTable;
