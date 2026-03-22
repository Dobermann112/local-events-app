import { useState } from "react"
import { useNavigate } from "react-router-dom"
import client from "../api/client"
import type { User } from "../types/User"

type Props = {
  currentUser: User
}

const CreateEvent = ({ currentUser }: Props) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [capacity, setCapacity] = useState(1)
  const [startAt, setStartAt] = useState("")
  const [endAt, setEndAt] = useState("")

  const AREA_ID = "e0d08572-bec7-442b-8e68-efa48711ea34"

  const handleSubmit = async () => {
    if (!title || !location || !startAt || !endAt) {
      alert("必須項目を入力してください")
      return
    }

    await client.post("/events", {
      title,
      description: "",
      startAt,
      endAt,
      location,
      capacity,
      allowSameDay: true,
      organizerId: currentUser.id,
      areaId: AREA_ID,
    })

    navigate("/")
  }

  return (
    <div>
      <h2>イベント作成</h2>

      <input
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="場所"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="number"
        value={capacity}
        onChange={(e) => setCapacity(Number(e.target.value))}
      />

      <input
        type="datetime-local"
        value={startAt}
        onChange={(e) => setStartAt(e.target.value)}
      />

      <input
        type="datetime-local"
        value={endAt}
        onChange={(e) => setEndAt(e.target.value)}
      />

      <button onClick={handleSubmit}>作成</button>
    </div>
  )
}

export default CreateEvent