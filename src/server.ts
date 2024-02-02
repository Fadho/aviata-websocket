/** @format */

import cors from "cors"
import helmet from "helmet"
import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import compression from "compression"

import { handleSocketRequest } from "./modules/common/socket"

const app = express()
const httpServer = createServer(app)

// Middlewares
app.use(helmet())
app.use(compression())

app.use(
    cors({
        origin: (_origin, callback) => {
            callback(null, true)
        },
        credentials: true,
    })
)

app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(express.json({ limit: "10mb" }))
app.disable("x-powered-by")

const io = new Server(httpServer, {
    cleanupEmptyChildNamespaces: true,
    addTrailingSlash: false,
    allowEIO3: true,
    cors: { origin: "*", credentials: true, optionsSuccessStatus: 200 },
});

handleSocketRequest(io);

export default httpServer
