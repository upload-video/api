import fastify from "fastify"
import cors from "@fastify/cors"

const app = fastify()

app.register(cors, {
  origin: '*'
})

app.listen({
  port: 3333,
  host: '0.0.0.0'
})
.then(() => console.log('🔥 HTTP Server Running...'))
