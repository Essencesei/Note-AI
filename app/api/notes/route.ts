import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const url = new URL(req.url);
  const authorId = url.searchParams.get("authorId");

  return NextResponse.json({ message: "Hello World" });
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  return NextResponse.json({ ...body });
};
