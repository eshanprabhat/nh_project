const mongoose = require("mongoose");
const planSchema = new mongoose.Schema({
    plan_name: {
    type: String,
    required: true,
  },
    price:{
    type:Number,
    required: true,
  },
  coverage:{
    type:Number,
    required: true
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features:{
    type:Array,
    required: true,
  },
  features_info:{
    type:Array,
    required: true,
  },
  created_on:{
    type:String,
    required:true,
  }
});

const Plans = mongoose.model("Plans", planSchema);
module.exports = Plans;