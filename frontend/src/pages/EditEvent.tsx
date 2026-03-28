import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import client from "../api/client"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import TagSelector from "../components/ui/TagSelector"


const EditEvent = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [capacity, setCapacity] = useState(1)
  const [startAt, setStartAt] = useState("")
  const [endAt, setEndAt] = useState("")
  const [description, setDescription] = useState("")
  const [targetGroups, setTargetGroups] = useState<string[]>([])

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await client.get(`/events/${id}`)
      const event = res.data

      setTitle(event.title)
      setLocation(event.location)
      setCapacity(event.capacity)
      setDescription(event.description || "")

      // datetime-local用変換
      setStartAt(event.startAt.slice(0, 16))
      setEndAt(event.endAt.slice(0, 16))

      setTargetGroups(event.targetGroups?.map((g: any) => g.group) ?? [])
    }

    fetchEvent()
  }, [id])

  const handleSubmit = async () => {
    if (!title || !location || !startAt || !endAt) {
      alert("必須項目を入力してください")
      return
    }

    await client.put(`/events/${id}`, {
      title,
      location,
      capacity,
      startAt,
      endAt,
      description,
      targetGroups,
    })

    navigate(`/events/${id}`)
  }

  return (
    <div>
      <h2>イベント編集</h2>

      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" />
      <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="場所" />
      <Input value={String(capacity)} onChange={(e) => setCapacity(Number(e.target.value))} type="number" />
      <Input value={startAt} onChange={(e) => setStartAt(e.target.value)} type="datetime-local" />
      <Input value={endAt} onChange={(e) => setEndAt(e.target.value)} type="datetime-local" />
      <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="説明" />

      <TagSelector selected={targetGroups} onChange={setTargetGroups} />

      <Button fullWidth onClick={handleSubmit}>
        更新
      </Button>
    </div>
  )
}

export default EditEvent