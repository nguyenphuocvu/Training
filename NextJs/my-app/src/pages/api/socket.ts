import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { Server as HTTPServer } from "http";
import type { NextApiResponseWithSocket } from "@/types/socket";

interface City {
  id: string;
  name: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  const io = new Server(res.socket.server as HTTPServer, {
    path: "/api/socket",
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
    });

    socket.on(
      "add-city",
      ({ roomId, city }: { roomId: string; city: City }) => {
        socket.to(roomId).emit("city-added", city);
      }
    );

    socket.on(
      "edit-city",
      ({ roomId, city }: { roomId: string; city: City }) => {
        socket.to(roomId).emit("city-edited", city);
      }
    );

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });

  res.end();
}
