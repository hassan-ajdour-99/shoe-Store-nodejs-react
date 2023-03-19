import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_DB_URL = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(
      `MonogoDb is connected! ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log("Error : " + error.message.red.underline);
    process.exit(1);
  }
};

export default connectDB;
