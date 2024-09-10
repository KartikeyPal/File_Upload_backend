const express = require('express');
const router = express.Router();


const { localFileUpload,imageUpload, videoUpload,imageSizeReduser} = require("../controllers/fieUpload");


// app Route
router.post("/imageUpload",imageUpload)
router.post("/localFileUpload",localFileUpload)
router.post("/videoUpload",videoUpload)
router.post('/imageSizeReduser',imageSizeReduser);


module.exports   = router;
    