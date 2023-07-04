"use client"

import usePackage from "@/hooks/usePackage";
import { CSSProperties } from "react";

interface IProps {
  take: number;
}

const PackageCustomStyles: CSSProperties[] = [
  { flex: "0 20%", height: "64px" },
  { flex: "0 40%", height: "64px" },
  { flex: "0 40%", height: "64px" },
  { flex: "0 40%", height: "64px" },
  { flex: "0 40%", height: "64px" },
  { flex: "0 20%", height: "64px" },
]

const PackageLayer = (props: IProps) => {
  const { take } = props;
  const { packagesInCar } = usePackage();

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
      { packagesInCar.map((item, index) => {
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