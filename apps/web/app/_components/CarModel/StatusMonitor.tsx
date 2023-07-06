"use client"

import { Badge, BadgeProps } from "antd";
import useSocketStatus, { SocketStatus } from "@/hooks/useSocketStatus";

const StatusBadgeMap: 
  { [key in SocketStatus]: { state: BadgeProps["status"], text: string }} 
= {
  connected: { state: "success", text: "在线" },
  reconnecting: { state: "warning", text: "重连中" },
  disconnect: { state: "error", text: "离线" }
}

const StatusMonitor = () => {
  const { status } = useSocketStatus();

  return (
    <div
      className="monitor"
      style={{
        margin: "8px 0",
        fontSize: ".9rem",
      }}
    >
      <div
        className="wrapper"
        style={{
          display: "flex",
          margin: "0 auto",
          width: "200px",
          justifyContent: "flex-end"
        }}
      >
        <div className="status">
          <Badge
            status={StatusBadgeMap[status].state}
            text={StatusBadgeMap[status].text}
          />
        </div>
      </div>
    </div>
  )
}

export default StatusMonitor;