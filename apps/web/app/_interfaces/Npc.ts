import Coordinate from "./Coordinate";

interface Npc {
  uid: string;
  name: string;
  role: "factory" | "client" | "barrier";
  xy: Coordinate;
}

export default Npc