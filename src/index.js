
import dns from "dns"
dns.setServers(["1.1.1.1","8.8.8.8"])
import connectDB from "./database/databaseco.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
    path : "./.env"
});

connectDB()
.then(() => {
    console.clear()
    console.log("Database connected successfully");

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.log("Error while connecting to database", error);
    process.exit(1);
});




