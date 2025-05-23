import { FondyCheckoutUrlResponse } from "@/@types/yookassa";
import axios from "axios";
import crypto from "crypto";

function generateSignature(
  secretKey: string,
  paymentData: Record<string, string | number>
): string {
  const sortedKeys = Object.keys(paymentData).sort();
  const signatureString = sortedKeys.map((key) => paymentData[key]).join("|");
  const fullString = `${secretKey}|${signatureString}`;
  return crypto.createHash("sha1").update(fullString).digest("hex");
}

interface Props {
  order_desc: string;
  order_id: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const orderBody = {
    merchant_id: process.env.FONDY_STORE_ID as string,
    order_id: details.order_id + "nextpizza",
    order_desc: details.order_desc,
    amount: details.amount * 100,
    currency: "USD",
    response_url: (process.env.BASE_URL as string) + "/fondy-redirect",
    server_callback_url:
      (process.env.BASE_URL as string) + "/api/checkout/callback",
  };

  const { data } = await axios.post<FondyCheckoutUrlResponse>(
    "https://pay.fondy.eu/api/checkout/url/",
    {
      request: {
        ...orderBody,
        signature: generateSignature(
          process.env.FONDY_PASSWORD as string,
          orderBody
        ),
      },
    }
  );

  return data;
}
