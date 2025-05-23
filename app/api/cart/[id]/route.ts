import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not founf" });
    }

    const cartItem = await prisma.cartItem.findFirst({ where: { id } });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not founf" });
    }

    await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity },
    });

    const updatedUsercart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUsercart);
  } catch (error) {
    console.log("[CART_PATCH] Server error", error);
    return NextResponse.json(
      { message: "Не удалось обновить корзину" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not founf" });
    }

    const cartItem = await prisma.cartItem.findFirst({ where: { id } });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not founf" });
    }

    await prisma.cartItem.delete({ where: { id } });

    const updatedUsercart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUsercart);
  } catch (error) {
    console.log("[CART_DELETE] Server error", error);
    return NextResponse.json(
      { message: "Не удалось удалить товар из корзины" },
      { status: 500 }
    );
  }
}
