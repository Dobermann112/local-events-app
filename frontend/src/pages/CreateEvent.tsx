import { useState } from "react"
import { useNavigate } from "react-router-dom"
import client from "../api/client"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

const AGE_GROUPS = [
  { label: "若者", value: "youth" },
  { label: "家族", value: "family" },
  { label: "高齢者", value: "senior" },
]

const CreateEvent = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [capacity, setCapacity] = useState(1)
  const [startAt, setStartAt] = useState("")
  const [endAt, setEndAt] = useState("")
  const [description, setDescription] = useState("")
  const [targetGroups, setTargetGroups] = useState<string[]>([])

  const AREA_ID = "eaeea7c2-011b-40ff-a872-2888628b5079"

  const handleToggleGroup = (value: string) => {
    setTargetGroups((prev) =>
      prev.includes(value)
        ? prev.filter((g) => g !== value)
        : [...prev, value]
    )
  }

  const handleSubmit = async () => {
    if (!title || !location || !startAt || !endAt) {
      alert("必須項目を入力してください")
      return
    }

    try {
      await client.post("/events", {
        title,
        description,
        startAt,
        endAt,
        location,
        capacity,
        allowSameDay: true,
        areaId: AREA_ID,
        targetGroups,
      })

      navigate("/")
    } catch (error) {
      console.error(error)
      alert("イベント作成に失敗しました")
    }
  }


  return (
    <div>
      <h2>イベント作成</h2>

      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" />
      <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="場所" />
      <Input value={String(capacity)} onChange={(e) => setCapacity(Number(e.target.value))} type="number" />
      <Input value={startAt} onChange={(e) => setStartAt(e.target.value)} type="datetime-local" />
      <Input value={endAt} onChange={(e) => setEndAt(e.target.value)} type="datetime-local" />
      <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="説明（任意）" />

      <div style={{ marginTop: "16px" }}>
        <p style={{ marginBottom: "8px" }}>対象世代（任意）</p>

        {AGE_GROUPS.map((group) => (
          <label
            key={group.value}
            style={{ display: "block", marginBottom: "4px" }}
          >
            <input
              type="checkbox"
              checked={targetGroups.includes(group.value)}
              onChange={() => handleToggleGroup(group.value)}
            />
            {group.label}
          </label>
        ))}
      </div>

      <Button fullWidth onClick={handleSubmit}>作成</Button>
    </div>
  )
}

export default CreateEvent