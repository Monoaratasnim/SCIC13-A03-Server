import mongoose from "mongoose";
import process from "process";


const connectDB = async () => {
  try {

    const databaseURL = process.env.MONGODB_URI;


    if (!databaseURL) {
      throw new Error(
        "MONGODB_URI is missing in environment variables"
      );
    }


    await mongoose.connect(
      databaseURL,
      {
        dbName: "propertynest",
      }
    );


    console.log(
      "MongoDB connected successfully"
    );

    console.log(
      "Database:",
      mongoose.connection.name
    );


  } catch (error) {

    console.error(
      "MongoDB connection failed:",
      error
    );

    process.exit(1);

  }
};


export default connectDB;