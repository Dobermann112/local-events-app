import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import EventDetail from "./pages/EventDetail"
import CreateEvent from "./pages/CreateEvent"
import MyPage from "./pages/MyPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/create" element={<CreateEvent />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  )
}

export default App