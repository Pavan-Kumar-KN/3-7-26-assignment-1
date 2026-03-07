import Header from "./components/Header";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children } : LayoutProps) => {
  return (
    <div>
      <Header />
      
    <div className="min-h-screen justify-center items-center">
      {children}
      </div>
    </div>
      
  )
}

export default Layout;
