const Users = require("./../models/UserModel");
const multer = require("multer");
const sharp = require("sharp");
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();

  const buffer = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `user-${req.params.id}-${Date.now()}.jpeg`,
    Body: buffer,
    ContentType: 'image/jpeg',
  };

  try {
    const upload = new Upload({
      client: s3,
      params: uploadParams,
    });

    const result = await upload.done();
    req.file.location = result.Location;

    next();
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    res.status(500).json({
      status: 'fail',
      message: 'Error uploading file to S3',
    });
  }
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
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
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.location; // Use the S3 file location URL
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
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
