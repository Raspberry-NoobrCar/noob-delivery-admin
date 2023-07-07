import Coordinate from "./Coordinate";

interface Npc {
  uid: string;
  name: string;
  role: "factory" | "client" | "barrier" | "car" | "traffic_sign";
  xy: Coordinate;
}

export default Npc