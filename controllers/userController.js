const Users = require("./../models/UserModel");
const multer = require("multer");
const sharp = require("sharp");
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: process.env.AWS_BUCKET_REGION
});

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
const s3 = new aws.S3();

// const multerStorage = multer.memoryStorage();

const multerFilter =(req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }else{
    cb(new Error('Not an image! Please upload only images.'),false)
  }
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, `user-${req.params.id}-${Date.now()}.jpeg`);
    }
  }),
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  // You may not need to resize the image if using S3, but if you do:
  const buffer = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.key,
      Body: buffer,
      ACL: 'public-read',
      ContentType: 'image/jpeg'
    };
    const result = await s3.upload(uploadParams).promise();

  req.file.location = result.Location; // Location of the image in S3

  next();
};

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
          user: newUser, 
        },
      });
    } catch (error) {
      console.error("Error: ", error);
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
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, {...filteredBody, photo:req.file.location}, {
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

