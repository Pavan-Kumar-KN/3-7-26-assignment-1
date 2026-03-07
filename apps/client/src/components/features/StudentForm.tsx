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
  const [formData, setFormData] = React.useState<Student>({
    name: "",
    email: "",
    age: 0,
  })
  const [errors, setErrors] = React.useState<Partial<StudentFormData>>({});
  
  const { students, addStudent, updateStudent } = useStudentStore((state) => state);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        age: initialData.age,
      })
    } else {
      setFormData({ name: "", email: "", age: 0 })
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

    if (formData.age === 0) {
      newErrors.age = "Age is required"
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120) {
      newErrors.age = "Please enter a valid age (1-120)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      if (initialData && initialData.id) {
        updateStudent(initialData?.id, { ...formData, id: initialData.id })
      } else {
        const id = students.length + 1;
        addStudent({ ...formData, id })
      }
      onOpenChange(false)
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
              <Button className="cursor-pointer" type="submit" disabled={isLoading} onClick={handleSubmit}>
                {isLoading ? "Saving..." : initialData ? "Update Student" : "Add Student"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
}

  export default StudentForm;