import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import prisma from "./prisma"
import userRoutes from "./routes/users"
import eventRoutes from "./routes/events"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// ルーティング
app.use("/users", userRoutes)
app.use("/events", eventRoutes)

// ヘルスチェック
app.get("/", (_req, res) => {
  res.json({ message: "Local Events API Running" })
})

// サーバー起動
app.listen(PORT, async () => {
  try {
    await prisma.$connect()
    console.log("✅ DB Connected")
    console.log(`🚀 Server running on port ${PORT}`)
  } catch (error) {
    console.error("❌ DB Connection Failed", error)
    process.exit(1)
  }
})