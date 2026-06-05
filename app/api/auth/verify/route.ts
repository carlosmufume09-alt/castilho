import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Token não fornecido" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      userId: decoded.userId,
    });
  } catch (error) {
    console.error("[v0] Verify error:", error);
    return NextResponse.json(
      { error: "Erro ao verificar token" },
      { status: 500 }
    );
  }
}
