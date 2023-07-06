"use client"

import { Header, Map, PackageList, CarModel } from "@/components";
import { Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";
import SocketContext from "@/hooks/useSocketContext"
import { notification } from "antd";

export default function Page() {
  const [ws, setWS] = useState<Socket>()
  const [notice, contextHolder] = notification.useNotification();

  useEffect(() => {
    setWS(io("http://192.168.11.69:5000", { reconnectionAttempts: 10 }));
  }, [])

  const openNotification = (message: string) => {
    notice.error({
      message: "故障",
      description: message,
      duration: 0,
      placement: "bottomLeft"
    })
  }

  useEffect(() => {
    if (!ws) return;
    ws.on("handleError", (error) => {
      openNotification(error);
    })
  }, [ws])

  return (
    <SocketContext.Provider value={{ ws, setWS }}>
      { contextHolder }
      <Header />
      <main>
        <section style={{
          display: "flex",
          maxWidth: "960px",
          margin: "0 auto",
        }}>
          <section className="main-panel"
            style={{ flex: "auto" }}
          >
            <PackageList />
          </section>
          <section style={{
            display: "flex",
            flexDirection: "column",
            flex: "0 320px",
          }}>
            <section className="extra-panel-a">
              <Map />
            </section>
            <section className="extra-panel-b">
              <CarModel />
            </section>
          </section>
        </section>
      </main>
    </SocketContext.Provider>
  );
}
