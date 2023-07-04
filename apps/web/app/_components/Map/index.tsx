"use client"

import { useState } from "react";
import { Coordinate, Npc } from "@/interfaces";
import CoordinateLayer from "./CoordinateLayer";
import NpcLayer from "./NpcLayer";
import RouteLayer from "./RouteLayer";

const npcData: Npc[] = [
  { uid: "n01", name: "l01", role: "client", xy: [0, 3] },
  { uid: "n02", name: "l02", role: "client", xy: [3, 6] },
  { uid: "n03", name: "l03", role: "client", xy: [4, 2] },
  { uid: "n04", name: "l04", role: "factory", xy: [5, 4] }
]

const routeData: Coordinate[] = [
  [5, 4],
  [4, 4],
  [4, 3],
  [4, 2],
]

const Map = () => {
  const size = 7;
  const [npcs, setNpcs] = useState<Npc[]>(npcData);
  const [barriers, setBarriers] = useState<Npc[]>([]);
  const [routeLine, setRouteLine] = useState<Coordinate[]>(routeData);

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
        <NpcLayer size={size} npcs={npcs}/>
        <RouteLayer routeLine={routeLine} size={size} />
      </div>
    </div>
  )
}

export default Map;
