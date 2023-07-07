"use client"

import usePackage from "@/hooks/usePackage";
import SocketContext from "@/hooks/useSocketContext";
import { CSSProperties, useContext, useEffect } from "react";

interface IProps {
  take: number;
}

const PackageCustomStyles: CSSProperties[] = [
  { flex: "0 33%", height: "48px" },
  { flex: "0 66%", height: "48px" },
  { flex: "0 66%", height: "48px" },
  { flex: "0 33%", height: "48px" },
]

const PackageLayer = (props: IProps) => {
  const { take } = props;
  const packageStore = usePackage();
  const { ws } = useContext(SocketContext);

  const handleLoadGood = (uid: string) => {
    console.log("load good");
    packageStore.loadPackage(uid);
  }

  const handleUnloadGood = (uid: string) => {
    console.log("unload good");
    packageStore.unLoadPackage(uid);
  }

  useEffect(() => {
    if (!ws) return;
    ws.on("loadGood", (uid: string) => {
      handleLoadGood(uid);
    })
    ws.on("unloadGood", (uid: string) => {
      handleUnloadGood(uid)
    })
  }, [ws]);

  return (
    <div
      className="layer package-layer"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap-reverse",
        position: "absolute",
        width: "100%",
        bottom: 0,
        left: 0
      }}
    >
      { packageStore.packagesInCar.map((item, index) => {
        return (
          <div 
            className="package-wrapper"
            key={item.uid}
            style={{
              padding: "1px",
              boxSizing: "border-box",
              ...PackageCustomStyles[index]
            }}
          >
            <div
              className="package"
              style={{
                backgroundColor: "orange",
                width: "100%",
                height: "100%"
              }}
            />
          </div>
        );
      })}
    </div>
  )
}

export default PackageLayer;