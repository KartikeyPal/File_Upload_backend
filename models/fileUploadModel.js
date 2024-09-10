const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();
const fileSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
})

fileSchema.post("save",async function(doc){
    try {
        console.log(doc);
        //transpoter
        let transpoter = nodemailer.createTransport({
            host:process.env.mail_host,
            auth:{
                user: process.env.mail_user,
                pass: process.env.mail_pass,
            },
        })
         // sendMail 
         let info = await  transpoter.sendMail({
            from: 'Kartikey',
            to: doc.email,
            subject:  `new file upload on cloudinary to check see ${doc.imageUrl }`,
            html:   `<h2> Hello </h2>   <p> file uploaded </p>`,
         })

         console.log("info",info);
    } catch (error) {
        console.error(error.message);
        // res.status(401).json({
        //     success:false,
        //     message:"something went wrong during video upload",

        // })
        
    }
})

module.exports = mongoose.model("File", fileSchema); 