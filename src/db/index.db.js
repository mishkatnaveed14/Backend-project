import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("mongo db connection started");

    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`Mongo db connectes !! db host ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("mongo db connection error", error.message);
    process.exit(1);
  }
};

export default connectDB;
