
import connectDB from "./database/databaseco.js";
import dotenv from "dotenv";
import express from "express";
dotenv.config({
    path : "./.env"
});



const app = express();

connectDB()
.then(() => {
    console.log("Database connected successfully");

   app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    }
    
)})

.catch((error) => {
    console.log("Error while connecting to database", error);
    process.exit(1);
});




