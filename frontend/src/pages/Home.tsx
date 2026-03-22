import { useEffect, useState } from "react"
import client from "../api/client"
import type { User } from "../types/User"
import type { Event } from "../types/Event"

type Props = {
  currentUser: User
}

const Home = ({ currentUser }: Props) => {
  // 🟢 イベント一覧
  const [events, setEvents] = useState<Event[]>([])

  // 🟢 参加状態（eventId → participationId）
  const [joinedEventMap, setJoinedEventMap] = useState<Record<string, string>>({})

  // 🟢 初期データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ① イベント取得
        const eventRes = await client.get("/events")
        setEvents(eventRes.data)

        // ② 参加情報取得
        const participationRes = await client.get(
          `/users/${currentUser.id}/participations`
        )

        // ③ Map生成
        const map: Record<string, string> = {}

        participationRes.data.forEach((p: any) => {
          map[p.eventId] = p.id
        })

        setJoinedEventMap(map)

        // 🧪 デバッグ確認
        console.log("joinedEventMap:", map)

      } catch (error) {
        console.error("Failed to fetch data", error)
      }
    }

    fetchData()
  }, [currentUser.id])

  return (
    <div>
      <h1>イベント一覧</h1>

      {/* 仮表示 */}
      <pre>{JSON.stringify(events, null, 2)}</pre>

      <h2>参加状態</h2>
      <pre>{JSON.stringify(joinedEventMap, null, 2)}</pre>
    </div>
  )
}

export default Home