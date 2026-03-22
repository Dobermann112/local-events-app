import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Login from "./pages/Login"
import MainLayout from "./layouts/MainLayout"
import type { User } from "./types/User"

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("user")
    if (saved) {
      setCurrentUser(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
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