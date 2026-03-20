import dotenv from "dotenv"
dotenv.config()

console.log("DB URL:", process.env.DATABASE_URL)

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default prisma