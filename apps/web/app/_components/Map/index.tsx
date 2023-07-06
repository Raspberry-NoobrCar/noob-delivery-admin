"use client"

import { useState, useContext, useEffect, useId } from "react";
import { Coordinate, Npc } from "@/interfaces";
import CoordinateLayer from "./CoordinateLayer";
import NpcLayer from "./NpcLayer";
import RouteLayer from "./RouteLayer";
import SocketContext from "@/hooks/useSocketContext";

const npcData: Npc[] = [
  { uid: "n01", name: "l01", role: "client", xy: [0, 3] },
  { uid: "n02", name: "l02", role: "client", xy: [3, 5] },
  { uid: "n03", name: "l03", role: "client", xy: [4, 2] },
  { uid: "n04", name: "l04", role: "client", xy: [5, 4] },
  { uid: "n05", name: "l05", role: "factory", xy: [0, 0] }
]

const routeData: Coordinate[] = [
  [5, 4],
  [4, 4],
  [4, 3],
  [4, 2],
]

const Map = () => {
  const size = 6;
  const [npcs, setNpcs] = useState<Npc[]>(npcData);
  const [barriers, setBarriers] = useState<Npc[]>([]);
  const [routeLine, setRouteLine] = useState<Coordinate[]>(routeData);
  const { ws } = useContext(SocketContext);

  useEffect(() => {
    if (!ws) return;
    ws.on("setPath", (routeLine: Coordinate[]) => {
      console.log("setPath", routeLine);
      setRouteLine(routeLine);
    })
    ws.on("setBarrier", (barrierXY: Coordinate) => {
      console.log("setBarrier", barrierXY);
      setBarriers([...barriers, { uid: useId(), name: "barrier", role: "barrier", xy: barrierXY}]);
    })
  }, [ws]);

  return (
    <div
      className="map-container"
      style={{
        margin: "16px",
        aspectRatio: "1",
        padding: "9px",
      }}
    >
      <div className="map-body" style={{ position: "relative", height: "100%" }}>
        <CoordinateLayer size={size} />
        <NpcLayer size={size} npcs={npcs} barriers={barriers} />
        <RouteLayer routeLine={routeLine} size={size} />
      </div>
    </div>
  )
}

export default Map;
