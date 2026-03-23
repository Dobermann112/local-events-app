import { Link } from "react-router-dom"

type Props = {
  currentUser: { id: string; name: string } | null
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

      <nav style={{ display: "flex", gap: "24px" }}>
        <Link to="/">Home</Link>
        <Link to="/create">作成</Link>
        <Link to="/mypage">マイページ</Link>
      </nav>

      <div>
        {currentUser ? (
          <>
            <span style={{ marginRight: "12px" }}>
              {currentUser.name}
            </span>
            <button onClick={onLogout}>ログアウト</button>
          </>
        ) : (
          <Link to="/login">ログイン</Link>
        )}
      </div>
    </header>
  )
}

export default Header