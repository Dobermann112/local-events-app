import type { User } from "../types/User"

type Props = {
  currentUser: User
}

const CreateEvent = ({ currentUser }: Props) => {
  return <div>Create Event: {currentUser.name}</div>
}

export default CreateEvent