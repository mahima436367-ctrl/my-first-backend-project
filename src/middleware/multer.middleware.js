import multer from "multer"

 const storage = multer.diskStorage({           // it will store in sdd
    destination : function (req,file,cb){
        cb(null,"./public/temp")
    },
    filename: function (req,file,cb){
        cb(null,file.originalname)
    }
 })
 
 export const upload = multer({             // it will store in RAM no need to give path
    storage: storage
})
 