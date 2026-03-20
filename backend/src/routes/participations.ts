import { Router } from "express"
import prisma from "../prisma"

const router = Router()

// キャンセル
router.patch("/:id/cancel", async (req, res) => {
  try {
    const participationId = req.params.id

    // 🆕 ① 存在チェック
    const participation = await prisma.participation.findUnique({
      where: { id: participationId },
    })

    if (!participation) {
      return res.status(404).json({ error: "Participation not found" })
    }

    // 🆕 ② すでにキャンセル済みチェック（任意）
    if (participation.status === "cancelled") {
      return res.status(400).json({ error: "Already cancelled" })
    }

    // ③ 更新
    const updated = await prisma.participation.update({
      where: { id: participationId },
      data: {
        status: "cancelled",
      },
    })

    res.json(updated)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

export default router