const multer = require('multer');
const PATH = "./uploads";
let storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, PATH)
  },
  filename: (req, file, cb)=>{
    cb(null, file.fieldname+'_'+Date.now())
  }
});

const upload = multer({
  storage: storage,
  fileFilter:(req, file, cb)=>{
    if(file.mimetype == "image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg"){
      cb(null, true);
    }
    else{
      cb(null, false);
      return cb(new Error("Only .png, .jpg or .jpeg allowed"))
    }
  }
})

module.exports = upload;
