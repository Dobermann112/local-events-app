import { Router } from "express"
import prisma from "../prisma"

const router = Router()

router.get("/:id/participations", async (req, res) => {
  try {
    const userId = req.params.id

    const participations = await prisma.participation.findMany({
      where: {
        userId,
        status: "joined",
      },
      include: {
        event: true,
      },
    })

    res.json(participations)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

export default router