import { Link } from "react-router-dom"

const FooterNav = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E0E0E0",
        display: "flex",
        justifyContent: "space-around",
        padding: "12px 0",
      }}
    >
      <Link to="/">🏠</Link>
      <Link to="/create">➕</Link>
      <Link to="/mypage">👤</Link>
    </footer>
  )
}

export default FooterNav