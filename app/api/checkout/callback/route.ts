import { PaymentFondyCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderSuccessTemplate } from "@/shared/components";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentFondyCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(String(body.order_id).replace("nextpizza", "")),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isSucceeded = (body.order_status as string) === "approved";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        "Next Pizza / Ваш заказ успешно оформлен 🎉",
        OrderSuccessTemplate({ orderId: order.id, items })
      );
    } else {
      // letter about payment false
    }
  } catch (error) {
    console.log("[Checkout Callback] Error: ", error);
    return NextResponse.json({ error: "Server error" });
  }
}
