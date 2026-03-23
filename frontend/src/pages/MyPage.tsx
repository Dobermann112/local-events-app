import { useEffect, useState } from "react"
import client from "../api/client"
import EventCard from "../components/EventCard"
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
        <EventCard
            key={p.id}
            event={p.event}
            isJoined={true}
            onCancel={() => handleCancel(p.id)}
        />
      ))}
    </div>
  )
}

export default MyPage