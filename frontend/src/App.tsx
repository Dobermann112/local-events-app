import { Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import EventDetail from "./pages/EventDetail"
import CreateEvent from "./pages/CreateEvent"
import EditEvent from "./pages/EditEvent"
import MyPage from "./pages/MyPage"
import type { User } from "./types/User"

type DecodedToken = {
  userId: string
  name: string
  ageGroup: string
}

const token = localStorage.getItem("token")

let initialUser: User | null = null

if (token) {
  try {
    const decoded = jwtDecode<DecodedToken>(token)
    initialUser = {
      id: decoded.userId,
      name: decoded.name,
      ageGroup: decoded.ageGroup,
    }
  } catch {
    localStorage.removeItem("token")
  }
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser)

  return (
    <Routes>
      {/* 公開ルート */}
      <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />
      <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />

      {/* 認証必須ルート */}
      <Route
        element={
          currentUser ? (
            <MainLayout
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route path="/" element={<Home currentUser={currentUser!} />} />
        <Route path="/events/:id" element={<EventDetail currentUser={currentUser!} />} />
        <Route path="/create" element={<CreateEvent currentUser={currentUser!} />} />
        <Route path="/events/:id/edit" element={<EditEvent currentUser={currentUser!} />} />
        <Route path="/mypage" element={<MyPage currentUser={currentUser!} />} />
      </Route>
    </Routes>
  )
}

export default App