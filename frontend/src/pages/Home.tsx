import { useEffect, useState } from "react"
import client from "../api/client"
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

  const now = new Date()

  return (
    <div>
      <h2>イベント一覧</h2>

      {events.map((event) => {
        const isJoined = !!joinedEventMap[event.id]
        const isEnded = new Date(event.endAt) < now

        const joinedCount = 0 // 次Stepで実装
        const isFull = joinedCount >= event.capacity

        let buttonLabel = "行ってみる"
        let disabled = false

        if (isEnded) {
          buttonLabel = "終了"
          disabled = true
        } else if (isFull) {
          buttonLabel = "満員"
          disabled = true
        } else if (isJoined) {
          buttonLabel = "参加済み"
        }

        return (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              marginBottom: "12px",
              borderRadius: "8px",
            }}
          >
            <h3>{event.title}</h3>
            <p>場所: {event.location}</p>
            <p>
              開催日時: {new Date(event.startAt).toLocaleString()}
            </p>
            <p>
              定員: {event.capacity}
            </p>

            <button
              disabled={disabled}
              onClick={() => {
                  if (!isJoined && !isEnded) {
                  handleJoin(event.id)
                  }
              }}
            >
              {buttonLabel}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Home