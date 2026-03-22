import { Router } from "express"
import bcrypt from "bcrypt"
import prisma from "../prisma"

const router = Router()

// サインアップ
router.post("/signup", async (req, res) => {
  try {
    const { name, password, ageGroup } = req.body

    if (!name || !password || !ageGroup) {
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
        ageGroup,
      },
    })

    res.status(201).json({ id: user.id, name: user.name })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

export default router