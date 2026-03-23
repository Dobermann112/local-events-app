import { useEffect, useState } from "react"
import client from "../api/client"
import EventCard from "../components/EventCard"
import type { User } from "../types/User"
import type { Event } from "../types/Event"

type Props = {
  currentUser: User
}

const Home = ({ currentUser }: Props) => {
  const [events, setEvents] = useState<Event[]>([])
  const [joinedEventMap, setJoinedEventMap] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchData = async () => {
      const eventRes = await client.get("/events")
      setEvents(eventRes.data)

      const participationRes = await client.get(
        `/users/${currentUser.id}/participations`
      )

      const map: Record<string, string> = {}

      participationRes.data.forEach((p: any) => {
        map[p.eventId] = p.id
      })

      setJoinedEventMap(map)
    }

    fetchData()
  }, [currentUser.id])

  const handleJoin = async (eventId: string) => {
    try {
        const res = await client.post(`/events/${eventId}/join`, {
        userId: currentUser.id,
        })

        // participationId取得
        const participationId = res.data.id

        // 即時UI更新
        setJoinedEventMap((prev) => ({
        ...prev,
        [eventId]: participationId,
        }))
    } catch (error: any) {
        console.error(error.response?.data)
        alert(error.response?.data?.error || "参加できませんでした")
    }
  }

  const handleCancel = async (eventId: string) => {
    try {
        const participationId = joinedEventMap[eventId]

        await client.patch(`/participations/${participationId}/cancel`)

        // 即時UI更新（削除）
        setJoinedEventMap((prev) => {
        const updated = { ...prev }
        delete updated[eventId]
        return updated
        })
    } catch (error) {
        console.error(error)
        alert("キャンセルできませんでした")
    }
  }

  const now = new Date()

  return (
    <div>
      <h2>イベント一覧</h2>

      {events.map((event) => {
        const isJoined = !!joinedEventMap[event.id]
        const isEnded = new Date(event.endAt) < now

        const isFull = event.currentJoinedCount >= event.capacity

        return (
          <EventCard
            key={event.id}
            event={event}
            isJoined={isJoined}
            isEnded={isEnded}
            isFull={isFull}
            onJoin={() => handleJoin(event.id)}
            onCancel={() => handleCancel(event.id)}
          />
        )
      })}
    </div>
  )
}

export default Home