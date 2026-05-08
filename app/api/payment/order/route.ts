import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getRazorpayClient } from "@/lib/razorpay-server";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const razorpay = getRazorpayClient();
    if (!razorpay) {
      return NextResponse.json(
        { error: "Payments not configured on this server." },
        { status: 503 }
      );
    }

    const amount = Number(process.env.RAZORPAY_AMOUNT_PAISE ?? "79000");
    if (!Number.isFinite(amount) || amount < 100) {
      return NextResponse.json(
        { error: "Invalid RAZORPAY_AMOUNT_PAISE" },
        { status: 500 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    if (!keyId) {
      return NextResponse.json({ error: "Missing Razorpay key." }, { status: 503 });
    }

    const uid = session.user.id.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 14);
    const receipt = `n_${uid}_${Date.now().toString(36)}`.slice(0, 39);

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt,
      notes: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (e) {
    console.error("[payment/order]", e);
    return NextResponse.json(
      { error: "Could not create order." },
      { status: 500 }
    );
  }
}
