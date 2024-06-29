const Patients = require("./../models/PatientModel");

exports.createPatient = async (req, res) => {
    try {
      const { user_id, name, gender, email, dob, address, Reg_date, Active } =
        req.body;
  
      const newPatient = await Patients.create({
        user_id,
        name,
        gender,
        email,
        dob,
        address,
        Reg_date,
        Active,
        show: true,
      });
      res.status(201).json({
        status: "success",
        data: {
          patient: newPatient, // Corrected key from 'tour' to 'user'
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

exports.getPatient = async (req, res) => {
    try{
      const patient= await Patients.findById(req.params.id);
      res.status(200).json({
        status:"success",
        data:{
          patient,
        }
      })
    }catch(error){
      res.status(404).json({
        status:"fail",
        message:error
      })
    }
  };

exports.deletePatient = async(req, res) => {
    try{
      await Patients.findByIdAndUpdate(req.params.id,{show:false},{
        new:true,
        runValidators:true
      })
      res.status(204).json({
        status: "success",
        data: null,
      });
  
    }catch(error){
      res.status(404).json({
        status:"fail",
        message:error,
      })
    }
  };

exports.getUserPatients = async(req, res) => {
    try{
    const user_Id = req.params.userId;
    const patients = await Patients.find({
      user_id: user_Id,
      show:true
    });
    res.status(200).json({
      status: "success",
      results: patients.length,
      data: {
        patients,
      },
    });
    }catch(error){
      res.status(404).json({
        status:"fail",
        message:error
      })
    }
  };
  