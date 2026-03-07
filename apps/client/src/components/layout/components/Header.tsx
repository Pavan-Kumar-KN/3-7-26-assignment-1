import { Button } from "@/components/ui/button";
import { GraduationCap, Moon, Sun } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Student Management</h1>
              <p className="text-sm text-muted-foreground">Manage your students efficiently</p>
            </div>
          </div>
          {/* Theme Toggle */}
        </div>
      </div>
    </header>
)
}

export default Header;