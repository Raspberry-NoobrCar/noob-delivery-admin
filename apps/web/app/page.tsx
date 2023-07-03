import { Header, Map, PackageList, CarModel } from "@/components";
import React from "react";

export default function Page() {
  return (
    <>
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
            gap: "24px"
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
    </>
  );
}
