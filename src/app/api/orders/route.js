import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { sendOrderNotificationEmail } from "@/lib/email";

// GET all orders
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST create new order
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, whatsapp, email, country, address, city, items, total } = body;

    // Validate required fields
    if (!name || !whatsapp || !email || !country || !address || !city) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Create order in database
    const order = await Order.create({
      name,
      whatsapp,
      email,
      country,
      address,
      city,
      status: "Pending",
    });

    console.log("[Order] Order created successfully:", {
      orderNumber: order.orderNumber,
      customerName: name,
      customerEmail: email,
    });

    // Send email notification to seller (non-blocking)
    // We don't await this to prevent delays in response
    sendOrderNotificationEmail({
      orderNumber: order.orderNumber,
      name,
      email,
      whatsapp,
      country,
      address,
      city,
      items: items || [],
      total: total || 0,
      createdAt: order.createdAt,
    })
      .then((emailResult) => {
        if (emailResult.success) {
          console.log("[Order] Email notification sent for order:", order.orderNumber);
        } else if (emailResult.skipped) {
          console.log("[Order] Email notification skipped (SMTP not configured) for order:", order.orderNumber);
        } else {
          console.error("[Order] Failed to send email notification for order:", order.orderNumber, emailResult.error);
        }
      })
      .catch((emailError) => {
        console.error("[Order] Email notification error for order:", order.orderNumber, emailError);
      });

    return NextResponse.json(
      { success: true, message: "Order created successfully", order },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Order] Error creating order:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}

