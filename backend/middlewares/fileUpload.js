const multer = require("multer");



 module.exports = function (){
    const upload = multer({
   
    limits:{
        fileSize: 5000000
    },
    // filter file
    fileFilter(req, file, cb){
    const fileExtension = file.originalname.split(".")[file.originalname.split(".").length - 1]
    if(!['jpg','png','jpeg'].includes(fileExtension)){
        return cb(new Error("only jpg, png and jpeg are allowed"));
    }
    cb(undefined, true)
    }
})

return upload
}
// module.exports.uploadImage = uploadImage