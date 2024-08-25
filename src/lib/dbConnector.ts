import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

let connection: ConnectionObject = {};

export async function dbConnect() {
  if (connection.isConnected) {
    console.log("Database already connected ");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL!, {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Database connection failed", err);
    process.exit(1);
  }
}
