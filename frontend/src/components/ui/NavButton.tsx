import { Link } from "react-router-dom"

type Props = {
  to: string
  children: React.ReactNode
}

const NavButton = ({ to, children }: Props) => {
  return (
    <Link
      to={to}
      style={{
        padding: "6px 12px",
        borderRadius: "8px",
        backgroundColor: "#F5F7FA",
        color: "#333",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      {children}
    </Link>
  )
}

export default NavButton