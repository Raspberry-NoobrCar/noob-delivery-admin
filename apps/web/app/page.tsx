"use client"

import { Header, Map, PackageList, CarModel } from "@/components";
import { Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";
import SocketContext from "@/hooks/useSocketContext"

export default function Page() {
  const [ws, setWS] = useState<Socket>()

  useEffect(() => {
    setWS(io("http://127.0.0.1:5000", { reconnectionAttempts: 10 }));
  }, [])

  return (
    <SocketContext.Provider value={{ ws, setWS }}>
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
