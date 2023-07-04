"use client"

import { memo, CSSProperties } from "react";
import { Tooltip } from "antd";
import { Npc } from "@/interfaces";

interface IProps {
  npcs: Npc[];
  size: number;
}

const RoleStyle: { [key: string]: CSSProperties } = {
  factory: {
    backgroundColor: "orange"
  },
  client: {
    backgroundColor: "blue"
  },
  barrier: {
    backgroundColor: "black"
  }
}

const NpcLayer = (props: IProps) => {
  const { npcs, size } = props;

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
                border: "2px solid #00000022",
                ...RoleStyle[npc.role]
              }}
            />
          </Tooltip>
        )
      })}
    </div>
  )
}

export default memo(NpcLayer);