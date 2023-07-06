import { useContext, useEffect, useState } from "react"
import SocketContext from "./useSocketContext";

export enum SocketStatus {
  connected = "connected",
  reconnecting = "reconnecting",
  disconnect = "disconnect",
}

const useSocketAlive = () => {
  const [status, setStatus] = useState<SocketStatus>(SocketStatus.disconnect);
  const { ws } = useContext(SocketContext);

  const handleConnect = () => {
    console.log("onconnect")
    setStatus(SocketStatus.connected);
  }

  const handleDisconnect = () => {
    console.log("ondisconnect")
    setStatus(SocketStatus.disconnect);
  }

  const handleReconnect = () => {
    console.log("onreconnect")
    setStatus(SocketStatus.reconnecting);
  }

  useEffect(() => {
    if (!ws) return;

    ws.on("connect", handleConnect);
    ws.io.on("reconnect_attempt", handleReconnect);
    ws.io.on("reconnect_failed", handleDisconnect);

    return () => {
      ws.off("connect", handleConnect);
      ws.off("close", handleDisconnect);
    }
  }, [ws])

  return {
    status
  }
}

export default useSocketAlive;