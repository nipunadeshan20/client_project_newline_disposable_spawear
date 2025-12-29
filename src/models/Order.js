import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    whatsapp: {
      type: String,
      required: [true, "WhatsApp number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Canceled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate order number before saving
OrderSchema.pre("save", async function () {
  if (this.isNew && !this.orderNumber) {
    try {
      const lastOrder = await mongoose.models.Order.findOne().sort({
        orderNumber: -1,
      });
      this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1001;
    } catch (error) {
      // If there's an error, use timestamp-based number
      this.orderNumber = Math.floor(Date.now() / 1000) % 100000 + 1000;
    }
  }
  // No need to call next() when using async/await in Mongoose 5+
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

