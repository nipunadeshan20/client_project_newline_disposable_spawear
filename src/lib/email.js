import nodemailer from "nodemailer";

// Email configuration
// For production, use environment variables:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SELLER_EMAIL

const emailConfig = {
  // SMTP Configuration - Update these with your email provider settings
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || "", // Your email address
    pass: process.env.SMTP_PASS || "", // Your email password or app-specific password
  },
};

// Seller's email address to receive order notifications
const SELLER_EMAIL = process.env.SELLER_EMAIL || "seller@newline.lk";
const FROM_EMAIL = process.env.FROM_EMAIL || "orders@newline.lk";
const FROM_NAME = process.env.FROM_NAME || "New Line Orders";

// Create reusable transporter
let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport(emailConfig);
  }
  return transporter;
}

/**
 * Send order notification email to seller
 * @param {Object} orderData - Order details
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
export async function sendOrderNotificationEmail(orderData) {
  const {
    orderNumber,
    name,
    email,
    whatsapp,
    country,
    address,
    city,
    items = [],
    total = 0,
    createdAt,
  } = orderData;

  // Format order date
  const orderDate = createdAt
    ? new Date(createdAt).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : new Date().toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      });

  // Generate product list HTML
  const productListHTML = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">
          ${item.itemName || "Product"}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
          ${item.color || "N/A"}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
          ${item.category || "N/A"}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
          ${item.quantity || 1}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">
          LKR ${((item.pricePerPack || 0) * (item.quantity || 1)).toLocaleString()}
        </td>
      </tr>
    `
    )
    .join("");

  // Generate product list for plain text
  const productListText = items
    .map(
      (item) =>
        `- ${item.itemName || "Product"} | Color: ${item.color || "N/A"} | Qty: ${item.quantity || 1} | LKR ${((item.pricePerPack || 0) * (item.quantity || 1)).toLocaleString()}`
    )
    .join("\n");

  // Email HTML template
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Notification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #643F18, #D7A556); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🛒 New Order Received!</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Order #${orderNumber}</p>
  </div>

  <!-- Order Info -->
  <div style="background: #f9f9f9; padding: 25px; border: 1px solid #ddd; border-top: none;">
    
    <!-- Order Details -->
    <div style="margin-bottom: 25px;">
      <h2 style="color: #643F18; font-size: 18px; margin: 0 0 15px; border-bottom: 2px solid #D7A556; padding-bottom: 8px;">
        📋 Order Details
      </h2>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 5px 0; color: #666;"><strong>Order ID:</strong></td>
          <td style="padding: 5px 0;">#${orderNumber}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #666;"><strong>Order Date:</strong></td>
          <td style="padding: 5px 0;">${orderDate}</td>
        </tr>
      </table>
    </div>

    <!-- Customer Details -->
    <div style="margin-bottom: 25px;">
      <h2 style="color: #643F18; font-size: 18px; margin: 0 0 15px; border-bottom: 2px solid #D7A556; padding-bottom: 8px;">
        👤 Customer Information
      </h2>
      <table style="width: 100%; font-size: 14px;">
        <tr>
          <td style="padding: 5px 0; color: #666;"><strong>Name:</strong></td>
          <td style="padding: 5px 0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #666;"><strong>Email:</strong></td>
          <td style="padding: 5px 0;"><a href="mailto:${email}" style="color: #643F18;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #666;"><strong>WhatsApp:</strong></td>
          <td style="padding: 5px 0;"><a href="https://wa.me/${whatsapp?.replace(/[^0-9]/g, "")}" style="color: #25D366;">${whatsapp}</a></td>
        </tr>
        <tr>
          <td style="padding: 5px 0; color: #666;"><strong>Address:</strong></td>
          <td style="padding: 5px 0;">${address}, ${city}, ${country}</td>
        </tr>
      </table>
    </div>

    <!-- Products -->
    <div style="margin-bottom: 25px;">
      <h2 style="color: #643F18; font-size: 18px; margin: 0 0 15px; border-bottom: 2px solid #D7A556; padding-bottom: 8px;">
        📦 Ordered Products
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <thead>
          <tr style="background: #643F18; color: white;">
            <th style="padding: 12px; text-align: left;">Product</th>
            <th style="padding: 12px; text-align: center;">Color</th>
            <th style="padding: 12px; text-align: center;">Category</th>
            <th style="padding: 12px; text-align: center;">Qty</th>
            <th style="padding: 12px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${productListHTML}
        </tbody>
      </table>
    </div>

    <!-- Total -->
    <div style="background: #643F18; color: white; padding: 15px 20px; border-radius: 5px; display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 18px; font-weight: bold;">Total Amount:</span>
      <span style="font-size: 24px; font-weight: bold;">LKR ${total.toLocaleString()}</span>
    </div>

  </div>

  <!-- Footer -->
  <div style="background: #333; color: #aaa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px;">
    <p style="margin: 0 0 10px;">Please contact the customer within 1 hour to confirm this order.</p>
    <p style="margin: 0;">
      <a href="https://wa.me/${whatsapp?.replace(/[^0-9]/g, "")}" style="color: #25D366; text-decoration: none; margin-right: 15px;">💬 WhatsApp</a>
      <a href="mailto:${email}" style="color: #D7A556; text-decoration: none;">✉️ Email</a>
    </p>
    <hr style="border: none; border-top: 1px solid #444; margin: 15px 0;">
    <p style="margin: 0; color: #666;">© ${new Date().getFullYear()} New Line. All rights reserved.</p>
  </div>

</body>
</html>
  `;

  // Plain text version
  const textContent = `
NEW ORDER RECEIVED!
==================

Order #${orderNumber}
Date: ${orderDate}

CUSTOMER INFORMATION
--------------------
Name: ${name}
Email: ${email}
WhatsApp: ${whatsapp}
Address: ${address}, ${city}, ${country}

ORDERED PRODUCTS
----------------
${productListText}

TOTAL: LKR ${total.toLocaleString()}

==================
Please contact the customer within 1 hour to confirm this order.
  `;

  try {
    // Check if SMTP credentials are configured
    if (!emailConfig.auth.user || !emailConfig.auth.pass) {
      console.warn("[Email] SMTP credentials not configured. Skipping email notification.");
      console.log("[Email] Order details that would be sent:", {
        orderNumber,
        customerName: name,
        customerEmail: email,
        total,
      });
      return {
        success: false,
        error: "SMTP credentials not configured",
        skipped: true,
      };
    }

    const transport = getTransporter();

    // Verify connection
    await transport.verify();

    // Send email
    const info = await transport.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: SELLER_EMAIL,
      subject: `🛒 New Order #${orderNumber} - ${name}`,
      text: textContent,
      html: htmlContent,
    });

    console.log("[Email] Order notification sent successfully:", {
      messageId: info.messageId,
      orderNumber,
      recipient: SELLER_EMAIL,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("[Email] Failed to send order notification:", {
      error: error.message,
      orderNumber,
      code: error.code,
    });

    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Test email configuration
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function testEmailConnection() {
  try {
    if (!emailConfig.auth.user || !emailConfig.auth.pass) {
      return {
        success: false,
        error: "SMTP credentials not configured",
      };
    }

    const transport = getTransporter();
    await transport.verify();

    console.log("[Email] Connection verified successfully");
    return { success: true };
  } catch (error) {
    console.error("[Email] Connection verification failed:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default {
  sendOrderNotificationEmail,
  testEmailConnection,
};

