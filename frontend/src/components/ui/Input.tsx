type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
}

const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
}: Props) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        boxSizing: "border-box",
        padding: "10px 12px",
        borderRadius: "12px",
        border: "1px solid #E0E0E0",
        marginBottom: "12px",
        fontSize: "14px",
      }}
    />
  )
}

export default Input