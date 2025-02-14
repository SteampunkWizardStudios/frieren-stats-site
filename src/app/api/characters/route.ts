import { getCharacterMap } from "@/utils/getCharImgs";
import { NextResponse } from "next/server";

export async function GET() {
  const characters = await getCharacterMap();
  return NextResponse.json(characters, { status: 200 });
}

// this route is likely not needed, if the client needs the characters, it could be provided pre-rendered