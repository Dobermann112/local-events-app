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
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        endAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        startAt: "asc",
      },
      include: {
        participations: {
          where: {
            status: "joined",
          },
          select: {
            id: true,
          },
        },
      },
    })

    const formatted = events.map((event) => ({
      ...event,
      currentJoinedCount: event.participations.length,
      participations: undefined,
    }))

    res.json(formatted)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// イベント参加
router.post("/:id/join", async (req, res) => {
  try {
    const eventId = req.params.id
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: "userId required" })
    }

    // ① イベント存在確認
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    })

    if (!event) {
      return res.status(404).json({ error: "Event not found" })
    }

    // ② 終了イベントチェック
    if (new Date(event.endAt) <= new Date()) {
      return res.status(400).json({ error: "Event already ended" })
    }

    // 🔥 ③ 既存レコード確認（ここが変更ポイント）
    const existing = await prisma.participation.findFirst({
      where: {
        userId,
        eventId,
      },
    })

    // 🔥 ④ 分岐ロジック
    if (existing) {
      if (existing.status === "joined") {
        return res.status(400).json({ error: "Already joined" })
      }

      // cancelled → 復活
      const updated = await prisma.participation.update({
        where: { id: existing.id },
        data: { status: "joined" },
      })

      return res.json(updated)
    }

    // ⑤ 定員チェック
    const currentCount = await prisma.participation.count({
      where: {
        eventId,
        status: "joined",
      },
    })

    if (currentCount >= event.capacity) {
      return res.status(400).json({ error: "Event is full" })
    }

    // ⑥ 新規作成
    const participation = await prisma.participation.create({
      data: {
        userId,
        eventId,
        status: "joined",
      },
    })

    res.status(201).json(participation)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

export default router