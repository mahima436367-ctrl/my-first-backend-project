import mongoose from "mongoose"
import { DB_NAME } from "../constant.js";   
const connectDB = async () => {
    console.log(process.env.MONGO_URI)
    try{
      const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
      console.log(`MongoDB connected: ${connection.connection.host} `)
    }
    catch(error){
        console.log("Error while connecting to database", error)
        process.exit(1)
    }
}

export default connectDB