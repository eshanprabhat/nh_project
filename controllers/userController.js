const Users = require("./../models/UserModel");
const multer = require("multer");
const sharp = require("sharp");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// const multerStorage = multer.diskStorage({
//   destination: (req,file,cb)=>{
//     cb(null,'src/images/users');
//   },
//   filename: (req,file,cb)=>{
//     const ext = file.mimetype.split('/')[1];
//     cb(null,`user-${req.params.id}-${Date.now()}.${ext}`);
//   }
// });
const multerStorage = multer.memoryStorage();

const multerFilter =(req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }else{
    cb(new Error('Not an image! Please upload only images.'),false)
  }
}

const upload = multer({
  storage : multerStorage,
  fileFilter : multerFilter
});
exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async(req,res,next)=>{
  if (!req.file) return next();
  req.file.filename = `user-${req.params.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`src/images/users/${req.file.filename}`);

  next();
}

exports.getAllUsers=async (req, res) => {
  try{
    const users = await Users.find();
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  }catch(error){
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.createUser=async (req, res) => {
    try {
      // Log the request body for debugging
      const newUser = await Users.create(req.body);
      res.status(201).json({
        status: "success",
        data: {
          user: newUser, // Corrected key from 'tour' to 'user'
        },
      });
    } catch (error) {
      console.error("Error: ", error); // Log the error for debugging
      res.status(400).json({
        status: "fail",
        message: error.message, // Send error message to the client
      });
    }
  };

exports.getUser = async (req,res)=>{
  try{
    const user = await Users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }catch(error){
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

exports.updateUser = async (req,res)=>{
  try{
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, filteredBody, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  }catch(error){
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

