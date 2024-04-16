import { db } from "@/db/connection";

export async function expiredFileAutomatically() {
  setTimeout(async () => {
    const files = await db.file.findMany()

    console.log(`🔥 There are ${files.length} files`)
  }, 1)
}