const mongoose = require('mongoose');
require('dotenv').config();
exports.connectDB =  () =>{
    mongoose.connect(process.env.Database_url, ).then(()=>{
        console.log("DB connection successful");
    }).catch(()=>{
        console.log("Db connection issue");
            process.exit(1);
    })
    
}