import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useStudentStore } from "@/store/useStudentStore";
import { useExportData } from "@/hooks/useExportData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download } from "lucide-react";

interface ExportSelectionModelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ExportSelectionModel = ({ open, onOpenChange }: ExportSelectionModelProps) => {
  const students = useStudentStore((state) => state.students);
  const { exportFile } = useExportData();
  
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set()
  )
  
  // Reset selection when dialog opens
  React.useEffect(() => {
    if (open) {
      setSelectedRows(new Set(students.map((s) => s.id))) // Select all by default
    }
  }, [open, students])  
  
  const selectAll = selectedRows.size ===  students.length > 0
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(students.map((row) => row.id)))
    } else {
      setSelectedRows(new Set())
    }
  }
  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedRows(newSelected)
  }
  
  const handleExport = () => {
    const selectedStudents = students.filter((s) => selectedRows.has(s.id))
    exportFile(selectedStudents)
    onOpenChange(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Export Students</DialogTitle>
          <DialogDescription>
            Select the students you want to export. {selectedRows.size} of {students.length} selected.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Table Container */}
        <div className="flex-1 overflow-auto border rounded-md">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    id="select-all-checkbox"
                    name="select-all-checkbox"
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Age</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={selectedRows.has(row.id) ? "selected" : undefined}
                  className="cursor-pointer"
                  onClick={() => handleSelectRow(row.id, !selectedRows.has(row.id))}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      id={`row-${row.id}-checkbox`}
                      name={`row-${row.id}-checkbox`}
                      checked={selectedRows.has(row.id)}
                      onCheckedChange={(checked) => handleSelectRow(row.id, checked === true)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={selectedRows.size === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export ({selectedRows.size})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportSelectionModel;