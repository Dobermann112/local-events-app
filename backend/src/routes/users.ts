import { Router } from "express"
import prisma from "../prisma"

const router = Router()

// ユーザー作成
router.post("/", async (req, res) => {
  try {
    const { name, ageGroup } = req.body

    if (!name || !ageGroup) {
      return res.status(400).json({ error: "name and ageGroup required" })
    }

    const user = await prisma.user.create({
      data: {
        name,
        ageGroup,
      },
    })

    res.status(201).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

export default router