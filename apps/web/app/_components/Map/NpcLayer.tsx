"use client"

import { memo, CSSProperties } from "react";
import { Tooltip } from "antd";
import { Npc } from "@/interfaces";

interface IProps {
  npcs: Npc[];
  barriers: Npc[];
  trafficSigns: Npc[];
  car: Npc;
  size: number;
}

const RoleStyle: { [key: string]: CSSProperties } = {
  factory: {
    backgroundColor: "#fa8c16"
  },
  client: {
    backgroundColor: "#69b1ff"
  },
  barrier: {
    backgroundColor: "black"
  },
  car: {
    backgroundColor: "#fa541c"
  },
  traffic_sign: {
    backgroundColor: "#722ed1"
  }
}

const NpcLayer = (props: IProps) => {
  const { npcs, barriers, trafficSigns ,car, size } = props;

  return (
    <div
      className="layer npc-layer"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: "50"
      }}
    >
      { car &&
        <Tooltip title={car.name} key={car.uid}>
          <div
            style={{
              position: "absolute",
              left: `calc(100%/${size - 1}*${car.xy[1]})`,
              top: `calc(100%/${size - 1}*${car.xy[0]})`,
              transform: "translateX(-50%) translateY(-50%)",
              height: "13px",
              width: "13px",
              borderRadius: "9px",
              border: "2px solid #00000066",
              zIndex: "160",
              ...RoleStyle[car.role]
            }}
          />
        </Tooltip>
      }
      { npcs.map(npc => {
        return (
          <Tooltip title={npc.name} key={npc.uid}>
            <div
              style={{
                position: "absolute",
                left: `calc(100%/${size - 1}*${npc.xy[1]})`,
                top: `calc(100%/${size - 1}*${npc.xy[0]})`,
                transform: "translateX(-50%) translateY(-50%)",
                height: "13px",
                width: "13px",
                borderRadius: "9px",
                border: "2px solid #00000066",
                zIndex: "120",
                ...RoleStyle[npc.role]
              }}
            />
          </Tooltip>
        )
      })}
      { barriers.map((barrier) => {
        return (
          <Tooltip title="障碍物" key={barrier.uid}>
            <div
              style={{
                display: barrier.xy[1] < 0 || barrier.xy[0] < 0 || barrier.xy[1] >= size || barrier.xy[0] >= size
                  ? "hidden"
                  : undefined,
                position: "absolute",
                left: `calc(100%/${size - 1}*${barrier.xy[1]})`,
                top: `calc(100%/${size - 1}*${barrier.xy[0]})`,
                transform: "translateX(-50%) translateY(-50%)",
                height: "13px",
                width: "13px",
                borderRadius: "9px",
                border: "2px solid #00000022",
                ...RoleStyle[barrier.role],
                zIndex: "110"
              }}
            />
          </Tooltip>
        )
      })}
      { trafficSigns.map((sign) => {
        return (
          <Tooltip title={sign.name} key={sign.uid}>
            <div
              style={{
                position: "absolute",
                left: `calc(100%/${size - 1}*${sign.xy[1]})`,
                top: `calc(100%/${size - 1}*${sign.xy[0]})`,
                transform: "translateX(-50%) translateY(-50%)",
                height: "13px",
                width: "13px",
                borderRadius: "9px",
                border: "2px solid #00000022",
                backgroundColor: "black",
                zIndex: "110"
              }}
            />
          </Tooltip>
        )
      })}
    </div>
  )
}

export default memo(NpcLayer);