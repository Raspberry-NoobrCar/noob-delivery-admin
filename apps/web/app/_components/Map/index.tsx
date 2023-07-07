"use client"

import { useState, useContext, useEffect, useId } from "react";
import { Coordinate, Npc } from "@/interfaces";
import CoordinateLayer from "./CoordinateLayer";
import NpcLayer from "./NpcLayer";
import RouteLayer from "./RouteLayer";
import SocketContext from "@/hooks/useSocketContext";
import createUid from "@/_utils/createUid";

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
  const [routeLine, setRouteLine] = useState<Coordinate[]>([]);
  const [trafficSigns, setTrafficSigns] = useState<Npc[]>([]);
  const [car, setCar] = useState<Npc>();
  const { ws } = useContext(SocketContext);

  useEffect(() => {
    setCar({ uid: "nc01", name: "c01", xy: [0, 0], role: "car" });
  }, [])

  useEffect(() => {
    if (!ws) return;
    const handleSetPath = (routeLine: Coordinate[]) => {
      console.log("setPath", routeLine);
      setRouteLine(routeLine);
    }
    ws.on("setPath", handleSetPath);

    const handleSetBarrier = (data: { xy: Coordinate }) => {
      const newBarrier: Npc = { uid: createUid(), name: "barrier", role: "barrier", xy: data.xy };
      console.log("setBarrier", newBarrier);
      setBarriers(state => [...state, newBarrier]);
    }
    ws.on("setBarrier", handleSetBarrier);

    const handleMove = (data: { action: string, xy: Coordinate }) => {
      console.log("handleMove", data);
      setCar({ ...car, xy: data.xy });
      setRouteLine(state => {
        state.shift();
        return [...state];
      })
    }
    ws.on("handleMove", handleMove);

    const handleSetTrafficSign = (data: { type: string, xy: Coordinate }) => {
      console.log("setTrafficSign", data);
      setTrafficSigns(state =>
        [ ...state, {
            uid: createUid(),
            name: data.type,
            role: "traffic_sign",
            xy: data.xy 
          }
        ]
      );
    }
    ws.on("setTrafficSign", handleSetTrafficSign);

    return () => {
      ws.off("setPath", handleSetPath);
      ws.off("setBarrier", handleSetBarrier);
      ws.off("handleMove", handleMove);
      ws.off("setTrafficSign", handleSetTrafficSign);
    }
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
        <NpcLayer size={size} trafficSigns={trafficSigns} npcs={npcs} barriers={barriers} car={car} />
        <RouteLayer routeLine={routeLine} size={size} />
      </div>
    </div>
  )
}

export default Map;
