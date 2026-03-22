import type { User } from "../types/User"

type Props = {
  currentUser: User
}

const Home = ({ currentUser }: Props) => {
  return <div>Home: {currentUser.name}</div>
}

export default Home