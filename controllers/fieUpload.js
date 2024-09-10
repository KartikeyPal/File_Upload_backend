const File = require("../models/fileUploadModel")
const cloudinary = require('cloudinary').v2 ;
//localFileUpload
exports.localFileUpload = async(req,res)=>{
    try {
        const file = req.files.file;
        console.log("file: ",file);

        let path = __dirname + "/files/" + Date.now() + `. ${file.name.split('.')[1]}`; 
        console.log("path --> " , path);

        file.mv(path,(err)=>{
            console.log(err)
        });

        res.json({
            success:true,
            message:"local file uploaded successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

//Image upload handler

function isFileType(type,supportedTypes){
    return supportedTypes.includes(type);

}

async function uploadFileToCloudinary(file, folder,quality) {


    const options = { folder,
        resource_type: "auto"
    };

    if(quality){
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req,res) =>{
    try {
        //fetching data
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file=req.files.image;
        console.log(file);

        //performing validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const file_type= file.name.split(".")[1].toLowerCase();
         //file formated supported
        if(!isFileType(file_type,supportedTypes)){
            res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }
        //uploading to cloudinary 

        const response = await uploadFileToCloudinary(file,"Kartikey"); 
        console.log(response);
        //save entry to database

        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        console.log(filedata);
        res.status(200).json({
            success:true,
            imageUrl:response.imageUrl,
            message:"image is successfully uploaded",     
        })

    } catch (error) {
            console.error(error);
        res.status(401).json({
            success:false,
            message:"something went wrong during imageUpload",
            error: error.message,

        })
    }
}

//video upload handler

exports.videoUpload = async (req,res) =>{
    try {
        const {name,email,tags}   = req.body;
        const file  = req.files.video;
        console.log(file);
        //validation
        const supportedTypes = ["mp4", "mov"];
        const file_type= file.name.split(".")[1].toLowerCase();
        if(!isFileType(file_type,supportedTypes)){
            res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }
      
        // learn  how can we add upper limet of around 5mb in our video
        if(!isFileType(file_type,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file type is not  supported",
            })
        }

        //uploading to cloudinary
       
        const response = await uploadFileToCloudinary(file,"Kartikey");
        console.log(response);

        // creating database enty
        const filedata = await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url,
        })
        console.log("--------------------------------------------------------------------------------------------");
        console.log(filedata);

        res.status(200).json({
            success:true,
            imageUrl:response.imageUrl,
            message:"video is successfully uploaded",     
        })

    } catch (error) {
        console.error(error.message);
        res.status(401).json({
            success:false,
            message:"something went wrong during video upload",

        })
    }
}

exports.imageSizeReduser = async(req,res) =>{
    try {
        const {name,email,tag,quality}   = req.body;
        const file  = req.files.image;
        console.log(file);
        //validation
        const supportedTypes = ["jpg","jpeg","png"];
        const file_type= file.name.split(".")[1].toLowerCase();
        if(!isFileType(file_type,supportedTypes)){
            res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }
      
        // learn  how can we add upper limet of around 5mb in our video
        if(!isFileType(file_type,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file type is not  supported",
            })
        }

        //uploading to cloudinary
       
        const response = await uploadFileToCloudinary(file,"Kartikey",quality);
        console.log(response);

        // creating database enty
        const filedata = await File.create({
            name,
            email,
            tag,
            imageUrl:response.secure_url,
        })
        console.log("--------------------------------------------------------------------------------------------");
        console.log(filedata);

        res.status(200).json({
            success:true,
            imageUrl:response.imageUrl,
            message:"image is successfully uploaded",     
        })

    }catch (error) {
        console.error(error.message);
        res.status(401).json({
            success:false,
            message:"something went wrong during imageReduser and then upload",
        })
    }
}