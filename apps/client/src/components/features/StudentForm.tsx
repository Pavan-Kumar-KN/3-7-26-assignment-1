import React , {useEffect} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { type Student, type StudentFormData } from "@/types/types"
import { useStudentStore } from "@/store/useStudentStore"

interface StudentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: Student | null
  isLoading?: boolean
}

function StudentForm({
  open,
  onOpenChange,
  initialData,
  isLoading,
}: StudentFormProps) {
  const [formData, setFormData] = React.useState<StudentFormData>({
    name: "",
    email: "",
    age: "",
  })
  const [errors, setErrors] = React.useState<Partial<StudentFormData>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const { students, addStudent, updateStudent } = useStudentStore((state) => state);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        age: initialData.age.toString(),
      })
    } else {
      setFormData({ name: "", email: "", age: "" })
    }
    setErrors({})
  }, [initialData, open])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validate = (): boolean => {
    const newErrors: Partial<StudentFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.age || formData.age.trim() === "") {
      newErrors.age = "Age is required"
    } else {
      const parsedAge = Number(formData.age);
      if (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
        newErrors.age = "Please enter a valid age (1-120)"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setIsSubmitting(true);
      
      const studentData: Student = {
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
      }

      // Simulate a network request delay of 1 second
      setTimeout(() => {
        if (initialData && initialData.id) {
          updateStudent(initialData.id, { ...studentData, id: initialData.id })
        } else {
          const id = students.length > 0 ? Math.max(...students.map(s => s.id || 0)) + 1 : 1;
          addStudent({ ...studentData, id })
        }
        setIsSubmitting(false);
        onOpenChange(false)
      }, 1000);
    }
  }

    const handleChange = (field: keyof StudentFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {initialData ? "Edit Student" : "Add New Student"}
            </DialogTitle>
            <DialogDescription>
              {initialData
                ? "Update the student information below."
                : "Fill in the details to add a new student."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  aria-invalid={!!errors.age}
                />
                {errors.age && (
                  <p className="text-sm text-destructive">{errors.age}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button className="cursor-pointer" type="submit" disabled={isSubmitting || isLoading} onClick={handleSubmit}>
                {isSubmitting || isLoading ? "Saving..." : initialData ? "Update Student" : "Add Student"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
}

  export default StudentForm;