import {v2 as cloudinary} from "cloudinary"
import fs from "fs"  

cloudinary . config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadcloudinary = async(localfilepath)=>{
    try {
        if(!localfilepath) {
            return null;
        }

        //upload the file to cloudinary
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })

        // file has been uploaded successfully, remove it from local storage
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath)
        }
        return response;
    } catch (error) {
        // remove the locally saved temporary file as the upload operation failed
        if (localfilepath && fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath)
        }
        return null;
    }
}

export { uploadcloudinary }