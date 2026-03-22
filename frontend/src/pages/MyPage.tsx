import { useEffect, useState } from "react"
import client from "../api/client"
import type { User } from "../types/User"
import type { Event } from "../types/Event"

type Props = {
  currentUser: User
}

type Participation = {
  id: string
  event: Event
}

const MyPage = ({ currentUser }: Props) => {
  const [participations, setParticipations] = useState<Participation[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await client.get(
        `/users/${currentUser.id}/participations`
      )
      setParticipations(res.data)
    }

    fetchData()
  }, [currentUser.id])

  const handleCancel = async (participationId: string) => {
    await client.patch(`/participations/${participationId}/cancel`)

    setParticipations((prev) =>
      prev.filter((p) => p.id !== participationId)
    )
  }

  return (
    <div>
      <h2>マイページ</h2>

      {participations.length === 0 && <p>参加中のイベントはありません</p>}

      {participations.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            marginBottom: "12px",
            borderRadius: "8px",
          }}
        >
          <h3>{p.event.title}</h3>
          <p>場所: {p.event.location}</p>
          <p>
            開催日時: {new Date(p.event.startAt).toLocaleString()}
          </p>

          <button onClick={() => handleCancel(p.id)}>
            キャンセル
          </button>
        </div>
      ))}
    </div>
  )
}

export default MyPage