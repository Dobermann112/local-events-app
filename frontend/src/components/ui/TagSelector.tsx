type Props = {
  selected: string[]
  onChange: (values: string[]) => void
}

const AGE_GROUPS = [
  { label: "若者", value: "youth" },
  { label: "家族", value: "family" },
  { label: "高齢者", value: "senior" },
]

const TagSelector = ({ selected, onChange }: Props) => {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <p style={{ marginBottom: "10px", fontWeight: "bold", color: "#4CAF50", textAlign: "left" }}>
        対象世代（任意）
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {AGE_GROUPS.map((group) => {
          const isSelected = selected.includes(group.value)

          return (
            <button
              key={group.value}
              type="button"
              onClick={() => toggle(group.value)}
              style={{
                padding: "10px 16px",
                borderRadius: "999px",
                border: "none",
                backgroundColor: isSelected ? "#4CAF50" : "#F5F5F5",
                color: isSelected ? "#fff" : "#555",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: isSelected
                  ? "0 2px 6px rgba(76, 175, 80, 0.4)"
                  : "none",
                transition: "0.2s",
              }}
            >
              {isSelected ? "✓ " : ""}
              {group.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TagSelector