import { FastifyInstance } from "fastify"
import z from "zod";

import { db } from "@/db/connection";
import { authentication } from "@/authentication";
import { userPayload } from "@/utils/auth";

export async function getAllFiles(app: FastifyInstance) {
  app.get('/files', {
    onRequest: [authentication]
  }, async ({ user, query }, reply) => {

    const queryPaginationSchema = z.object({
      query: z.string().nullish(),
      pageIndex: z.string().nullish().default('0').transform(Number)
    })

    const { pageIndex, query: searchQuery } = queryPaginationSchema.parse(query)

    const { sub: userId } = user as userPayload

    const [files, count] = await Promise.all([
      await db.file.findMany({
        where: searchQuery ? {
          userId,
          name: {
            contains: searchQuery
          }
        } : {
          userId,
        },
        take: 8,
        skip: pageIndex * 8,
        orderBy: {
          createdAt: 'desc'
        }
      }),

      await db.file.count({
        where: {
          userId,
        }
      })
    ])

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
      }),
      total: count
    })
  })
}