import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set in server/.env");
  }

  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected: ${connection.connection.host}`);
}
