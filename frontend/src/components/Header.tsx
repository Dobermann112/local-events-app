import { useNavigate } from "react-router-dom"

function Header({ currentUser, setCurrentUser }: any) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    setCurrentUser(null)
    navigate("/login")
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>Local Events</h3>
      <div>
        <span>{currentUser.name}</span>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    </div>
  )
}

export default Header