import { Router } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../prisma"

const router = Router()

// サインアップ
router.post("/signup", async (req, res) => {
  try {
    const { name, password } = req.body

    if (!name || !password) {
      return res.status(400).json({ error: "Missing fields" })
    }

    const existingUser = await prisma.user.findUnique({
      where: { name },
    })

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    })

    res.status(201).json({ id: user.id, name: user.name })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// ログイン
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body

    if (!name || !password) {
      return res.status(400).json({ error: "Missing fields" })
    }

    const user = await prisma.user.findUnique({
      where: { name },
    })

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET as string
    )

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

export default router