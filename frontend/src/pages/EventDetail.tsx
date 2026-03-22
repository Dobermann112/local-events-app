import type { User } from "../types/User"

type Props = {
  currentUser: User
}

const EventDetail = ({ currentUser }: Props) => {
  return <div>Event Detail: {currentUser.name}</div>
}

export default EventDetail