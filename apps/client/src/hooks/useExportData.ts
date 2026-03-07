import type { Student } from "@/types/types";
import { useCallback } from "react";
import { utils, writeFile } from 'xlsx';

export const useExportData = () => { 
  const exportFile = useCallback((students: Student[]) => {
    const rows = students.map((student) => {
      return {
        id: student.id,
        name: student.name,
        age: student.age,
        email: student.email
      }
    })
    
    const ws = utils.json_to_sheet(rows);
    /* create workbook and append worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    /* export to XLSX */
    writeFile(wb, "studentsData.xlsx");
  }, []);
  
  return { exportFile };
}