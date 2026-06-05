import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/auth";

function validateToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  const decoded = verifyToken(token);
  return decoded?.userId ?? null;
}

// GET - Obter configurações da loja
export async function GET() {
  try {
    let store = await prisma.store.findFirst();

    if (!store) {
      store = await prisma.store.create({
        data: {
          name: "Shells Fashion Elegance",
          description: "Loja online de moda elegante",
          whatsapp: "5511999999999",
        },
      });
    }

    return NextResponse.json({ success: true, data: store });
  } catch (error) {
    console.error("[v0] Get store error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar configurações" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar configurações (admin)
export async function PUT(request: NextRequest) {
  try {
    const userId = validateToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, logo, whatsapp } = body;

    let store = await prisma.store.findFirst();

    if (!store) {
      store = await prisma.store.create({
        data: { name: name || "Shells Fashion Elegance" },
      });
    }

    const updated = await prisma.store.update({
      where: { id: store.id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(logo && { logo }),
        ...(whatsapp && { whatsapp }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[v0] Update store error:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar configurações" },
      { status: 500 }
    );
  }
}
