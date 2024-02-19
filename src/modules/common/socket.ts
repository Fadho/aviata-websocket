/** @format */

import { Server } from "socket.io"
import RealTime from "../v1/busly-connection"
import { encryptData } from "./hashings"

const connectedSockets: Array<string> = []
let socketInterval: any

const packet = new RealTime(null)

export const handleSocketRequest = async (io: Server) => {
    // @ts-ignore
    io.on("connection", async socket => {
        console.log(`${socket.id} is connected`)
        connectedSockets.push(socket.id)

        socket.on("disconnect", () => {
            connectedSockets.pop()

            if (connectedSockets.length === 0 && socketInterval) {
                clearInterval(socketInterval)
            }
            socket.disconnect(true)
        })
    })
    console.log(connectedSockets.length, !!socketInterval)
    setInterval(() => {
        const data = {
            ...packet.Start(),
            connectedUsers: connectedSockets.length,
        }
        
        // console.log(data);
        io.volatile.emit(
            "crash-event",
            encryptData(JSON.stringify(data))
        )
    }, 200)
}
