// firstly async handler ko import krenge
import { asynchandler } from "../utils/asynchandler.js"


 //error ko handle krne k liye
 import { ApiError } from "../utils/apierror.js"

 // user ki entry db m krne k liye
 import { user } from "../models/user_model.js"

//cloudinary pr file upload krne k liye
 import  { uploadcloudinary } from "../utils/cloudinary.js"

 //responses ko handle krne k liye hai
 import { ApiResponse } from "../utils/Apiresponse.js"
 

 // register krwa rhe hai saari entries
// ek const bnayenge yaha pr hum user ko bss register kre honge
 const registerUser = asynchandler(async(req,res)=>{
  const {fullname,email,username,password}=req.body
  


  // field check kre hai ki koi empty toh ni hai
    if(
        [fullname,email,username,password].some((field)=>
        !field || field.trim()==="")
    ){
        throw new ApiError(400,"all are fields are required")
    }


    //check kre hai koi or user toh ni hai
   const existeduser= await user.findOne({
        $or : [{username},{email}]
    })


// if existed user hai toh aage proceed ni nahi krna hai error throw kr dena hai
 if(existeduser){
    throw new ApiError(409, "user with this email or username already existed")
 }

const avatarlocalpath= req.files?.avatar?.[0]?.path
const coverlocalpath = req.files?.coverImage?.[0]?.path 

if(!avatarlocalpath){
    throw new ApiError(400,"avatar is necessary")
}


// upload on cloudinary

const avatar = await uploadcloudinary(avatarlocalpath)
const coverImage = await uploadcloudinary(coverlocalpath)
// console.log(avatar.secure_url);


// if(!avatar){
// throw new ApiError(400 , "avatar file is required")
// }
 
// database m entry krwa raha hai
const User = await user.create({
    fullname,
    avatar: avatar?.url||avatar?.secure_url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()

})

//removing password referencetoken
const createduser= await user.findById(User._id).select(
    "-password -referenceToken"
)

if(!createduser){
    throw new ApiError(500,"something went wrong while registering a user")
}

    return res.status(201).json(
        new ApiResponse(200, createduser,"user enter successfully")
    )
 })

const getUsers = asynchandler(async(req,res)=>{
    const users = await user.find({}).select("-password -referenceToken")
    return res.status(200).json(
        new ApiResponse(200, users, "users fetched successfully")
    )
})

export { registerUser, getUsers }  