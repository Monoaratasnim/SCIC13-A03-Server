import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    const databaseURL = process.env.MONGODB_URI;

    if (!databaseURL) {
      throw new Error(
        "MONGODB_URI is missing in environment variables"
      );
    }

    await mongoose.connect(databaseURL, {
      dbName: "propertynest",
    });

    console.log("MongoDB connected successfully");
    console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;