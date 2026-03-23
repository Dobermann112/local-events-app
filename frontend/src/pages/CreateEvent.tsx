import { useState } from "react"
import { useNavigate } from "react-router-dom"
import client from "../api/client"
import type { User } from "../types/User"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

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

      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" />
      <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="場所" />
      <Input value={String(capacity)} onChange={(e) => setCapacity(Number(e.target.value))} type="number" />
      <Input value={startAt} onChange={(e) => setStartAt(e.target.value)} type="datetime-local" />
      <Input value={endAt} onChange={(e) => setEndAt(e.target.value)} type="datetime-local" />

      <Button fullWidth onClick={handleSubmit}>作成</Button>
    </div>
  )
}

export default CreateEvent