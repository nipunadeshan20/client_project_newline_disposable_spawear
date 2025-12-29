import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

// GET single product
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { itemName, category, color, material, description, moreInfo, images, isActive } = body;

    await connectDB();

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Check T-Light uniqueness if changing to T-Light category
    if (category === "T-Light Candle" && product.category !== "T-Light Candle") {
      const existingTLight = await Product.findOne({ category: "T-Light Candle" });
      if (existingTLight) {
        return NextResponse.json(
          { success: false, message: "A T-Light Candle product already exists. Only one is allowed." },
          { status: 400 }
        );
      }
    }

    // Update fields
    if (itemName) product.itemName = itemName;
    if (category) product.category = category;
    if (description !== undefined) product.description = description;
    if (moreInfo !== undefined) product.moreInfo = moreInfo;
    if (images) product.images = images;
    if (isActive !== undefined) product.isActive = isActive;

    // Handle color and material based on category
    const currentCategory = category || product.category;
    if (currentCategory === "T-Light Candle") {
      product.color = null;
      product.material = null;
    } else {
      if (color !== undefined) product.color = color;
      if (material !== undefined) product.material = material;
    }

    await product.save();

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product" },
      { status: 500 }
    );
  }
}

