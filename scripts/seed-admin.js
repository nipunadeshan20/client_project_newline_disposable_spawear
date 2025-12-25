const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI =
  "mongodb+srv://isurudvp_db_user:aUrfyG73khV7I9Hq@newlineware.aosnrid.mongodb.net/newline_db?appName=NewLineWare";

// Admin Schema (inline for script)
const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function seedAdmin() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB!");

    // Default admin credentials
    const adminEmail = "admin@newline.com";
    const adminPassword = "admin123"; // Change this in production!

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists:", adminEmail);
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create admin
    const admin = await Admin.create({
      email: adminEmail,
      password: hashedPassword,
    });

    console.log("Admin user created successfully!");
    console.log("Email:", admin.email);
    console.log("Password:", adminPassword);
    console.log("\n⚠️  Please change the password after first login!");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();

