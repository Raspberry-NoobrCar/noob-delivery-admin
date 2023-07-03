import { NextRequest, NextResponse } from "next/server";
import { Package } from "@/interfaces";

const data: Array<Omit<Package, "status">> = [
  { receiverName: "j10c", uid: "rb12303", destination: "l01", contact: "test@example.com" },
  { receiverName: "j10c", uid: "rb12304", destination: "l01", contact: "test@example.com" },
  { receiverName: "j10c", uid: "rb12305", destination: "l01", contact: "test@example.com" },
  { receiverName: "j10c", uid: "rb12306", destination: "l01", contact: "test@example.com" },
  { receiverName: "j20c", uid: "rb12307", destination: "l01", contact: "test@example.com" },
  { receiverName: "j30c", uid: "rb12308", destination: "l01", contact: "test@example.com" },
  { receiverName: "j40c", uid: "rb12309", destination: "l01", contact: "test@example.com" },
  { receiverName: "j50c", uid: "rb12310", destination: "l01", contact: "test@example.com" }
]

export async function GET(req: NextRequest) {
  return new NextResponse(JSON.stringify({
    code: 200,
    msg: "ok",
    data: {
      list: data,
      count: data.length
    }
  }), { status: 200 });
}