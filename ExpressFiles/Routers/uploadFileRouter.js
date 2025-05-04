const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    // where the image will be saved
    destination: function(req,file,callback){
        callback(null, path.join(__dirname,"../Images"))
    },
    // filename uploaded by the user
    filename: function(req,file,callback){
        callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    }
})

const upload = multer({storage})

router.post("/", upload.single("image"),(req,res)=>{
    res.status(200).json({message:"image uploaded"})
})

module.exports = router;