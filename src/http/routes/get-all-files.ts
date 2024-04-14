import { FastifyInstance } from "fastify"

import { db } from "@/db/connection";
import { authentication } from "@/authentication";
import { userPayload } from "@/utils/auth";

export async function getAllFiles(app: FastifyInstance) {
  app.get('/files', {
    onRequest: [authentication]
  }, async ({ user }, reply) => {

    const { sub: userId } = user as userPayload

    const files = await db.file.findMany({
      where: {
        userId,
      }
    })
    return reply.status(200).send({
      files: files.map((file) => {
        const size = Number(file.size) / 1024
        
        return {
          id: file.id,
          name: file.name,
          slug: file.slug,
          size: Number(size / 1024).toFixed(2).concat(' MB'),
          status: file.status,
          createdAt: file.createdAt,
        }
      })
    })
  })
}