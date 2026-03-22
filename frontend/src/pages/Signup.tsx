import { useState } from "react"
import { useNavigate } from "react-router-dom"
import client from "../api/client"
import type { User } from "../types/User"

type Props = {
  setCurrentUser: (user: User | null) => void
}

const Signup = ({ setCurrentUser }: Props) => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [ageGroup, setAgeGroup] = useState("youth")

  const handleSignup = async () => {
    try {
      await client.post("/auth/signup", {
        name,
        password,
        ageGroup,
      })

      // 自動ログイン
      const res = await client.post("/auth/login", {
        name,
        password,
      })

      localStorage.setItem("token", res.data.token)

      setCurrentUser(res.data.user)

      navigate("/")
    } catch (error: any) {
      alert(error.response?.data?.error || "登録失敗")
    }
  }

  return (
    <div>
      <h2>サインアップ</h2>

      <input
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        value={ageGroup}
        onChange={(e) => setAgeGroup(e.target.value)}
      >
        <option value="youth">若者</option>
        <option value="family">家族</option>
        <option value="senior">高齢者</option>
      </select>

      <button onClick={handleSignup}>登録</button>
    </div>
  )
}

export default Signup