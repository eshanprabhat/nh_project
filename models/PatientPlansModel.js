const mongoose = require("mongoose");
const patientPlansSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    plan:{
        type:{},
        required:true
    },
    selectedPatients:{
        type:[{}],
        required:true,
    },
    Purchased_On:{
        type:Date,
        required:true,
    },  
    Expiry_Date:{
        type:Date,
        required:true,
    },  
    order_id:{
        type:String,
        required:true
    },
    payment_id:{
        type:String,
        required:true
    },
    total_amount:{
        type:Number,
        required:true
    }
});

const PatientPlans = mongoose.model("PatientPlans", patientPlansSchema);
module.exports = PatientPlans;
