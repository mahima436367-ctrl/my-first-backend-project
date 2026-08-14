// firstly async handler ko import krenge
import { asynchandler } from "../utils/asynchandler.js"
 // ek const bnayenge yaha pr hum user ko bss register kre honge

 const registerUser = asynchandler(async(req,res)=>{
  res.status(200).json({
        message: "ok"
    })
 })

export { registerUser }