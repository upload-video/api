import fastify from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"

import { env } from "@/env"

import { errorHandler } from "@/error-handler"
import { createUser } from "./routes/create-user"
import { createUploadURL } from "./routes/create-upload-url"
import { createDownloadURL } from "./routes/create-download-url"
import { updateFileStatus } from "./routes/update-file-status"
import { getAllFiles } from "./routes/get-all-files"
import { sendAuthenticationLink } from "./routes/send-authentication-link"
import { authenticateFromLink } from "./routes/authenticate-from-link"
import { deleteFileById } from "./routes/delete-file"
import { expiredFileAutomatically } from "./routes/expired-file-automatically"

const app = fastify()

app.register(cors, {
  origin: '*'
})

app.register(jwt, {
  secret: env.JWT_SECRET,
})

//routes
app.register(createUser)
app.register(createUploadURL)
app.register(createDownloadURL)
app.register(updateFileStatus)
app.register(getAllFiles)
app.register(sendAuthenticationLink)
app.register(authenticateFromLink)
app.register(deleteFileById)

app.setErrorHandler(errorHandler)

expiredFileAutomatically()
  .then(() => {
    console.log('🔥 Executed!')
  })

app.listen({
  port: 3333,
  host: '0.0.0.0'
})
  .then(() => console.log('🔥 HTTP Server Running...'))
