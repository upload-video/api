import { db } from "@/db/connection";
import { FastifyInstance } from "fastify";
import z from "zod";
import { BadRequest } from "./_errors/bad-request";
import dayjs from "dayjs";

export async function authenticateFromLink(app: FastifyInstance) {
  app.get('/auth-links/authenticate', async ({ query }, reply) => {
    const authFromLinkSchema = z.object({
      code: z.string(),
      redirect: z.string().url()
    })

    const { code, redirect } = authFromLinkSchema.parse(query)

    const authLinkFromCode = await db.authLink.findFirst({
      where: {
        code
      }
    })

    if (!authLinkFromCode) {
      throw new BadRequest('Code not found.')
    }

    if (dayjs().diff(authLinkFromCode.createdAt, 'days') > 7) {
      throw new BadRequest('The link is no longer valid.')
    }

    await db.authLink.delete({
      where: {
        code,
      }
    })

    reply.redirect(301, redirect)
  })
}