import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => void
  studentName: string
}

export function DeleteConfirmDialog({
  onSubmit,
  open,
  onOpenChange,
  studentName,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            Delete Student
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2">
            Are you sure you want to delete <strong>"{studentName}"</strong>?
            <br />
            <span className="text-destructive">This action cannot be undone.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onSubmit()} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete Student
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
