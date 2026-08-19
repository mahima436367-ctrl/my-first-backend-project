import mongoose from "mongoose"
import { DB_NAME } from "../constant.js";   
const connectDB = async () => {
    try{
      const mongoUri = process.env.MONGO_URI.trim().replace(/\/$/, "");
      const connection = await mongoose.connect(`${mongoUri}/${DB_NAME}`);
      console.log(`MongoDB connected: ${connection.connection.host} `)
    }
    catch(error){
        console.log("Error while connecting to database", error)
        process.exit(1)
    }
}

export default connectDB