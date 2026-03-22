import { Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import MainLayout from "./layouts/MainLayout"
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
      <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />
      <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />

      <Route
        path="/*"
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
      />
    </Routes>
  )
}

export default App