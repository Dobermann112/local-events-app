import type { User } from "../types/User"
import NavButton from "./ui/NavButton"

type Props = {
  currentUser: User
  onLogout: () => void
}

const Header = ({ currentUser, onLogout }: Props) => {
  return (
    <header
      style={{
        backgroundColor: "#FFFFFF",
        padding: "16px 24px",
        borderBottom: "1px solid #E0E0E0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "#4CAF50", margin: 0 }}>ロコイベ</h2>

      <nav className="desktop-only" style={{ gap: "24px" }}>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/create">作成</NavButton>
        <NavButton to="/mypage">マイページ</NavButton>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "14px", color: "#333" }}>
          {currentUser.name}
        </span>

        <button
          onClick={onLogout}
          style={{
            backgroundColor: "#FF8A65",
            border: "none",
            borderRadius: "8px",
            padding: "6px 10px",
            color: "#fff",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          ログアウト
        </button>
      </div>
    </header>
  )
}

export default Header