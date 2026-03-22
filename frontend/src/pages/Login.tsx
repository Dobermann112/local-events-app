import { useState } from "react"
import { useNavigate } from "react-router-dom"
import client from "../api/client"

function Login({ setCurrentUser }: any) {
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!name) return

    const res = await client.post("/users", {
      name,
      ageGroup: "youth"
    })

    localStorage.setItem("user", JSON.stringify(res.data))
    setCurrentUser(res.data)
    navigate("/")
  }

  return (
    <div>
      <h2>ログイン</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前を入力"
      />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  )
}

export default Login