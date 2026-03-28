import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import client from "../api/client"
import type { User } from "../types/User"
import SimpleHeader from "../components/SimpleHeader"
import PageContainer from "../components/ui/PageContainer"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

type Props = {
  setCurrentUser: (user: User | null) => void
}

const Signup = ({ setCurrentUser }: Props) => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    try {
      await client.post("/auth/signup", {
        name,
        password,
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
    <>
      <SimpleHeader />
      <PageContainer>
        <h2>サインアップ</h2>

        <Input placeholder="名前" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button fullWidth onClick={handleSignup}>登録</Button>

        <p style={{ marginTop: "16px", fontSize: "14px" }}>
          既にアカウントをお持ちの方は{" "}
        <Link to="/login" style={{ color: "#4CAF50", fontWeight: "bold" }} >
            ログイン
        </Link>
        </p>
      </PageContainer>
    </>
  )
}

export default Signup