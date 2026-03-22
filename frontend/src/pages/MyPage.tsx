import type { User } from "../types/User"

type Props = {
  currentUser: User
}

const MyPage = ({ currentUser }: Props) => {
  return <div>MyPage: {currentUser.name}</div>
}

export default MyPage