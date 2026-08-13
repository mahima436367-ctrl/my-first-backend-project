import {v2 as cloudinary} from "cloudinary"
import { response } from "express";
import fs from "fs"  

cloudinary . config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadcloudinary = async(localfilepath)=>{
    try {
        if(!localfilepath) {
            return console.log("file path not found")
        }

        //upload the file cloudinary

        const reponse = await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })

        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary",reponse.url);
        return reponse

        
    } catch (error) {
        fs.unlinkSync(localfilepath) // remove the locally saved temporary file as the uploaded operation got failed
        return null;
        
    }
}

export { uploadcloudinary }