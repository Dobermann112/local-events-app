import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import client from "../api/client"
import EventCard from "../components/EventCard"
import type { User } from "../types/User"
import type { Event } from "../types/Event"

type Props = {
  currentUser: User
}

const EventDetail = ({ currentUser }: Props) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await client.get(`/events/${id}`)
      setEvent(res.data)
      setLoading(false)
    }

    fetchEvent()
  }, [id])

  if (loading) return <p>読み込み中...</p>
  if (!event) return <p>イベントが見つかりません</p>

  const participation = event.participations.find(
    (p: any) => p.userId === currentUser.id
  )

  const isOwner = event.organizerId === currentUser.id

  const isJoined = event.participations.some(
    (p: any) => p.userId === currentUser.id
  )

  const isFull = event.currentJoinedCount >= event.capacity

  const isEnded = new Date(event.endAt) < new Date()

  const handleCancel = async () => {
    if (!participation) return

    await client.patch(`/participations/${participation.id}/cancel`)
    window.location.reload()
  }

  const handleDelete = async () => {
    const ok = window.confirm("本当に削除しますか？")
    if (!ok) return

    await client.delete(`/events/${id}`)
    navigate("/")
  }

  return (
    <div>
        <EventCard
          event={event}
          disableNavigation
          showDescription

          isOwner={isOwner}
          isJoined={isJoined}
          isFull={isFull}
          isEnded={isEnded}

          onJoin={async () => {
            await client.post(`/events/${id}/join`, {
              userId: currentUser.id,
            })
              window.location.reload()
          }}

          onCancel={handleCancel}

          onEdit={() => {
            navigate(`/events/${id}/edit`)
          }}

          onDelete={handleDelete}
        />

    </div>
  )
}

export default EventDetail