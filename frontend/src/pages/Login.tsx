import { useState } from "react"
import { useNavigate } from "react-router-dom"
import client from "../api/client"
import PageContainer from "../components/ui/PageContainer"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

function Login({ setCurrentUser }: any) {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("") // ← 追加
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!name || !password) return

    try {
      const res = await client.post("/auth/login", {
        name,
        password,
      })

      // ✅ トークン保存
      localStorage.setItem("token", res.data.token)

      // ✅ ユーザーもstateに反映
      setCurrentUser(res.data.user)

      navigate("/")
    } catch (error) {
      console.error(error)
      alert("ログイン失敗")
    }
  }

  return (
    <PageContainer>
      <h2>ログイン</h2>
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="名前" />
      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワード" />

      <Button fullWidth onClick={handleLogin}>ログイン</Button>
    </PageContainer>
  )
}

export default Login