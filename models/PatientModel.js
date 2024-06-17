const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
    user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required: true,
  },
  dob:{
    type:String,
    required: true,
  },
  address:{
    type:String,
    required: true,
  },
  Reg_date:{
    type:Date,
    required: true,
  },
  Active:{
    type:Boolean,
    required:true,
  },
  show:{
    type:Boolean,
    required: true,
  }
});

const Patients = mongoose.model("Patients", patientSchema);
module.exports = Patients;