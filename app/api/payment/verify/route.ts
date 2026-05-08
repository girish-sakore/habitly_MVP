import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getRazorpayClient } from "@/lib/razorpay-server";

function safeCompare(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Payments not configured." },
        { status: 503 }
      );
    }

    let body: {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
    };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
    }

    const orderId = body.razorpay_order_id;
    const paymentId = body.razorpay_payment_id;
    const signature = body.razorpay_signature;

    if (
      typeof orderId !== "string" ||
      typeof paymentId !== "string" ||
      typeof signature !== "string" ||
      !orderId.length ||
      !paymentId.length ||
      !signature.length
    ) {
      return NextResponse.json({ error: "Missing payment fields." }, { status: 400 });
    }

    const digest = createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const sigNorm = signature.trim().toLowerCase();

    if (!safeCompare(digest, sigNorm)) {
      return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
    }

    const rz = getRazorpayClient();
    if (!rz) {
      return NextResponse.json({ error: "Payments not configured." }, { status: 503 });
    }

    const order = await rz.orders.fetch(orderId);
    const noteUser =
      typeof order.notes?.userId === "string" ? order.notes.userId : "";
    if (noteUser !== session.user.id) {
      return NextResponse.json(
        { error: "Order does not belong to this account." },
        { status: 403 }
      );
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { isPremium: true },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[payment/verify]", e);
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}
