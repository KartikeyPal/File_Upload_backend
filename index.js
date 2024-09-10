//app creation
const express = require('express');
const app = express();

//PORT
require('dotenv').config();
const PORT = process.env.PORT || 3000;


//adding middleware
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//dbconnect
const db = require('./config/database')
db.connectDB();

//cloudinary connect
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

//Routes mounting
const upload = require('./Routes/rotues');
app.use("/api/v1/upload",upload);

// acctivating server
app.listen(PORT,()=>{
    console.log(`app is runnin at port no. ${PORT}`);
})
