import { Routes, Route } from "react-router-dom"
import Header from "../components/Header"
import Home from "../pages/Home"
import EventDetail from "../pages/EventDetail"
import CreateEvent from "../pages/CreateEvent"
import MyPage from "../pages/MyPage"
import type { User } from "../types/User"

type Props = {
  currentUser: User
  setCurrentUser: (user: User | null) => void
}

function MainLayout({ currentUser, setCurrentUser }: Props) {
  return (
    <>
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/events/:id" element={<EventDetail currentUser={currentUser} />} />
        <Route path="/create" element={<CreateEvent currentUser={currentUser} />} />
        <Route path="/mypage" element={<MyPage currentUser={currentUser} />} />
      </Routes>
    </>
  )
}

export default MainLayout