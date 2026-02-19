import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongDB Connected");
    });

    connection.on("error", (error) => {
      console.log("MongDB Connection Error, Make sure DB is running: " + error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while connecting to DB: ", error);
  }
}
