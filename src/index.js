import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoute.js"
import postRoutes from "./routes/postRoute.js"
import route from "./routes/routes.js"
import dotenv from "dotenv"

const server = express();
dotenv.config()
server.use(cors())
server.use(express.json())

server.get("/status", (req, res) => res.sendStatus(200))

server.use(authRoutes)
server.use(postRoutes)
server.use(route)

server.listen(process.env.PORT, () => console.log(`A mágica acontece no ${process.env.PORT}`))