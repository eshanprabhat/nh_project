const PatientPlans = require("./../models/PatientPlansModel");

exports.createPatientPlan = async (req, res) => {
    try {
        const newPatientPlan = await PatientPlans.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                newPatientPlan,
            },
        });
    } catch (error) {
        console.error("Error in /api/patient-plans:", error); // Log the error for debugging
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
  };

exports.getAllPatientPlans = async (req, res) => {
    const patientPlans = await PatientPlans.find();
    res.status(200).json({
      status: "success",
      data: {
        patientPlans,
      },
    });
  };

exports.getUserPatientPlans = async(req, res) => {
    try{
    const userId = req.params.userId;
    const patientPlans = await PatientPlans.find({
      user_id: userId,
      Expiry_Date: { $gte: new Date() } 
    });
    res.status(200).json({
      status: "success",
      results: patientPlans.length,
      data: {
        patientPlans,
      },
    });
    }catch(error){
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  };
  