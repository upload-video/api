import { FastifyInstance } from "fastify"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";

import { db } from "@/db/connection";
import { r2 } from "@/lib/cloudflare-r2";
import { env } from "@/env";
import { BadRequest } from "./_errors/bad-request";

export async function updateFileStatus(app: FastifyInstance) {
  app.get('/update/:id', {
  }, async ({ params }) => {
    const updateFileParamsSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = updateFileParamsSchema.parse(params)

    const file = await db.file.findUnique({
      where: {
        id,
      }
    })

    if (!file) {
      throw new BadRequest('The file not found.')
    }

    await db.file.update({
      where: {
        id: file.id
      },
      data: {
        status: 'VALID'
      }
    })
  })
}