import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

// GET all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request) {
  try {
    const body = await request.json();
    const { itemName, category, color, material, description, moreInfo, images } = body;

    console.log("Creating product with data:", { itemName, category, color, material, description, moreInfo, imagesCount: images?.length });

    // Validate required fields
    if (!itemName || !category) {
      return NextResponse.json(
        { success: false, message: "Item name and category are required" },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ["Fourway Material Wear", "Paper Material Wear", "T-Light Candle"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { success: false, message: `Invalid category. Must be one of: ${validCategories.join(", ")}` },
        { status: 400 }
      );
    }

    await connectDB();

    // Check for T-Light uniqueness - only one T-Light Candle allowed
    if (category === "T-Light Candle") {
      const existingTLight = await Product.findOne({ category: "T-Light Candle" });
      if (existingTLight) {
        return NextResponse.json(
          { success: false, message: "A T-Light Candle product already exists. Only one is allowed." },
          { status: 400 }
        );
      }
    }

    // Create product data
    const productData = {
      itemName: itemName.trim(),
      category,
      description: description?.trim() || "",
      moreInfo: moreInfo?.trim() || "",
      images: images || [],
      isActive: true,
    };

    // Only add color and material for non T-Light products
    if (category !== "T-Light Candle") {
      productData.color = color?.trim() || null;
      productData.material = material?.trim() || null;
    } else {
      productData.color = null;
      productData.material = null;
    }

    const product = await Product.create(productData);

    console.log("Product created successfully:", product._id);

    return NextResponse.json(
      { success: true, message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error.message);
    console.error("Full error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
