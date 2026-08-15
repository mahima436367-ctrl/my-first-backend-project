// firstly async handler ko import krenge
import { asynchandler } from "../utils/asynchandler.js"
 // ek const bnayenge yaha pr hum user ko bss register kre honge
 import { ApiError } from "../utils/apierror.js"
 import { user } from "../models/user_model.js"
 import  { uploadcloudinary } from "../utils/cloudinary.js"
 import { ApiResponse } from "../utils/Apiresponse.js"
 

 
 const registerUser = asynchandler(async(req,res)=>{
  const {fullName,email,username,password}=req.body
  console.log("email",email)
  // field check kre hai ki koi empty toh ni hai
    if(
        [fullName,email,username,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"all are fields are required")
    }
    //check kre hai koi or user toh ni hai
   const existeduser= user.findOne({
        $or : [{username},{email}]
    })
// if existed user hai toh aage proceed ni nahi krna hai error throw kr dena hai
 if(existeduser){
    throw new ApiError(409, "user with this email or username already existed")
 }

const avatarlocalpath= req.files?.avatar[0]?.path
const coverlocalpath = req.files?.coverImage[0]?.path 

if(!avatarlocalpath){
    throw new ApiError(400,"avatar is necessary")
}
// upload on cloudinary

const avatar = await uploadcloudinary(avatarlocalpath)
const cover = await uploadcloudinary(coverlocalpath)
 })

if(!avatar){
throw new ApiError(400 , "avatar file is required")
}
 
// database m entry krwa raha hai
const User = await user.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()

})

const createduser= await user.findById(user._id).select(
    "-password -referenceToken"
)

if(!createduser){
    throw new ApiError(500,"something went wrong while registering a user")
}

return res.status(201).json(
    new ApiResponse(200, createduser,"user enter successfully")
)


export { registerUser }  