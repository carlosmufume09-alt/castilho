import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET - Listar pedidos
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error("[v0] Get orders error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 }
    );
  }
}

// POST - Criar novo pedido
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, phone, items, total } = body;

    if (!customer || !phone || !items || !total) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        customer,
        phone,
        items: JSON.stringify(items),
        total: parseFloat(total),
        status: "pendente",
      },
    });

    return NextResponse.json(
      { success: true, data: order },
      { status: 201 }
    );
  } catch (error) {
    console.error("[v0] Create order error:", error);
    return NextResponse.json(
      { error: "Erro ao criar pedido" },
      { status: 500 }
    );
  }
}
