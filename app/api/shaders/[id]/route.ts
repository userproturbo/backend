import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const shader = await prisma.shader.findUnique({
      where: { id: params.id }
    });

    if (!shader) {
      return NextResponse.json({ error: "Shader not found" }, { status: 404 });
    }

    return NextResponse.json(shader);
  } catch (error) {
    console.error("Error fetching shader:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
