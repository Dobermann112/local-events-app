import type { Event } from "../types/Event"
import Button from "./ui/Button"

type Props = {
  event: Event
  isJoined?: boolean
  isFull?: boolean
  isEnded?: boolean
  onJoin?: () => void
  onCancel?: () => void
  hideAction?: boolean
}

const EventCard = ({
  event,
  isJoined,
  isFull,
  isEnded,
  onJoin,
  onCancel,
  hideAction,
}: Props) => {
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
            onClick={isJoined ? onCancel : onJoin}
        >
            {buttonLabel}
        </Button>
      )}
    </div>
  )
}

export default EventCard