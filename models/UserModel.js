const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique:true,
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  email: {
    type: String,
    required: true,
  },
  date:{
    type:Date,
    "required":"true"
  }
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
