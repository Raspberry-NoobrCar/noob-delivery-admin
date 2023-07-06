import { createContext } from "react";
import { Socket } from "socket.io-client";

interface SocketContext {
  ws: Socket | null;
  setWS: (ws: Socket) => void
}

const SocketContext = createContext<SocketContext>({
  ws: null,
  setWS: () => {}
})

export default SocketContext