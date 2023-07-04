"use client"

import useSocket from "@/hooks/useSocket";
import { Badge } from "antd";
import { useEffect } from "react";

const StatusMonitor = () => {
  const { subscribe, alive, init } = useSocket();

  useEffect(() => {
    init("ws://localhost:8080/api/noob");
    subscribe("/monitor", {
      type: "onclose",
      callback: () => {
        console.log("close");
      }
    })
  }, []);

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
        <div className="alive">
          <Badge status={alive ? "success" : "error"} text={ alive ? "在线" : "离线" } />
        </div>
      </div>
    </div>
  )
}

export default StatusMonitor;