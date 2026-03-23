import type { Event } from "../types/Event"
import { useNavigate } from "react-router-dom"
import Button from "./ui/Button"

type Props = {
  event: Event
  isJoined?: boolean
  isFull?: boolean
  isEnded?: boolean
  onJoin?: () => void
  onCancel?: () => void
  hideAction?: boolean
  disableNavigation?: boolean

  isOwner?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

const EventCard = ({
  event,
  isJoined,
  isFull,
  isEnded,
  onJoin,
  onCancel,
  hideAction,
  disableNavigation,
  isOwner,
  onEdit,
  onDelete,
}: Props) => {
  const navigate = useNavigate()

  let buttonLabel = ""
  let buttonColor = "#4CAF50"
  let disabled = false

  if (isEnded) {
    buttonLabel = "終了"
    buttonColor = "#BDBDBD"
    disabled = true
  } else if (isFull) {
    buttonLabel = "満員"
    buttonColor = "#FF8A65"
    disabled = true
  } else if (isJoined) {
    buttonLabel = "キャンセル"
    buttonColor = "#FF8A65"
  } else {
    buttonLabel = "行ってみる"
  }

  return (
    <div
      onClick={() => {if (!disableNavigation) {navigate(`/events/${event.id}`)}}}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        border: "1px solid #E0E0E0",
      }}
    >
      <h3 style={{ marginBottom: "8px", color: "#333" }}>
        🎉 {event.title}
      </h3>

      <p style={{ margin: "4px 0", color: "#666" }}>
        📍 {event.location}
      </p>

      <p style={{ margin: "4px 0", color: "#666" }}>
        🗓 {new Date(event.startAt).toLocaleString()}
      </p>

      {event.capacity && (
        <p style={{ margin: "4px 0", color: "#666" }}>
          👥 {event.currentJoinedCount} / {event.capacity}
        </p>
      )}

      {!hideAction && (
        <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
            
            {/* 参加ボタン */}
            <Button
            fullWidth
            variant={
                isEnded
                ? "neutral"
                : isFull || isJoined
                ? "danger"
                : "primary"
            }
            disabled={disabled}
            onClick={(e) => {
                e.stopPropagation()
                isJoined ? onCancel?.() : onJoin?.()
            }}
            >
            {buttonLabel}
            </Button>

            {/* 編集（作成者のみ） */}
            {isOwner && (
            <Button
                variant="primary"
                onClick={(e) => {
                e.stopPropagation()
                onEdit?.()
                }}
            >
                編集
            </Button>
            )}

            {/* 削除（作成者のみ） */}
            {isOwner && (
            <Button
                variant="danger"
                onClick={(e) => {
                e.stopPropagation()
                onDelete?.()
                }}
            >
                削除
            </Button>
            )}
        </div>
        )}
    </div>
  )
}

export default EventCard