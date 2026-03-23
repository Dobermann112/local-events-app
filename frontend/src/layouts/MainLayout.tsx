import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import FooterNav from "../components/FooterNav"
import type { User } from "../types/User"

type Props = {
  currentUser: User
  setCurrentUser: (user: User | null) => void
}

function MainLayout({ currentUser, setCurrentUser }: Props) {

  const handleLogout = () => {
    localStorage.removeItem("token")
    setCurrentUser(null)
  }
  
  return (
    <div style={{ backgroundColor: "#F5F7FA", minHeight: "100vh" }}>
      {/* PC Header */}
      <div className="desktop-only">
        <Header
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      </div>

      <main
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "24px 16px 80px 16px",
        }}
      >
        <Outlet />
      </main>

      {/* Mobile Footer */}
      <div className="mobile-only">
        <FooterNav />
      </div>
    </div>
  )
}

export default MainLayout