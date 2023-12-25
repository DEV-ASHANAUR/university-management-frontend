import { NextRequest, NextResponse } from "next/server";
//ts-ignore
type Iname = {
  name: string;
}
export async function POST(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ name: "File uploaded" });
}
