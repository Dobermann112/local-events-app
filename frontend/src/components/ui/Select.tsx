import type { ReactNode } from "react"

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  children: ReactNode
}

const Select = ({ value, onChange, children }: Props) => {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: "12px",
        border: "1px solid #E0E0E0",
        marginBottom: "12px",
      }}
    >
      {children}
    </select>
  )
}

export default Select