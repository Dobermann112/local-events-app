import { Router } from "express"
import prisma from "../prisma"

const router = Router()

// イベント作成
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      startAt,
      endAt,
      location,
      capacity,
      allowSameDay,
      organizerId,
      areaId,
    } = req.body

    if (!title || !startAt || !endAt || !location || !capacity || !organizerId || !areaId) {
      return res.status(400).json({ error: "Required fields missing" })
    }

    if (new Date(endAt) <= new Date(startAt)) {
      return res.status(400).json({ error: "endAt must be after startAt" })
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startAt: new Date(startAt),
        endAt: new Date(endAt),
        location,
        capacity,
        allowSameDay,
        organizerId,
        areaId,
      },
    })

    res.status(201).json(event)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// イベント一覧（終了イベント除外）
router.get("/", async (_req, res) => {
  try {
    const now = new Date()

    const events = await prisma.event.findMany({
      where: {
        endAt: {
          gt: now,
        },
      },
      orderBy: {
        startAt: "asc",
      },
      include: {
        area: true,
        participations: true,
      },
    })

    res.json(events)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

export default router