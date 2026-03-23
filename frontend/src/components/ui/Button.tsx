type Props = {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "danger" | "neutral"
  disabled?: boolean
  fullWidth?: boolean
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled,
  fullWidth,
}: Props) => {
  const colors = {
    primary: "#4CAF50",
    danger: "#FF8A65",
    neutral: "#BDBDBD",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: fullWidth ? "100%" : "auto",
        padding: "10px 16px",
        borderRadius: "12px",
        border: "none",
        fontWeight: "bold",
        backgroundColor: colors[variant],
        color: "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "0.2s ease",
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {children}
    </button>
  )
}

export default Button