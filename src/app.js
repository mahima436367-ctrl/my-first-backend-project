import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

//routes imports
import userRouter from "./routes/user.routes.js"
import morgan from "morgan"
 
const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes declaration
app.use("/api/v1/users",userRouter)
app.get("/",(req,res)=>{
    return res.status(200).json({message:"OK",success:true})
});





export { app }