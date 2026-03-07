import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import StudentManagement from "./pages/student/StudentMangement";
import { useStudentStore } from "./store/useStudentStore";
import { initialStudents } from "./data/studentsConstant";

const App = () => { 
  const { setStudents } = useStudentStore((state) => state);
  
  useEffect(() => {
    setTimeout(() => {
      setStudents(initialStudents);
    }, 1000);
  }, [])
  
  return (<div>
    <Layout>
      <StudentManagement />
    </Layout>
  </div>
    )
}


export default App;