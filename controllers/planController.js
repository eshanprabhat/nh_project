const Plans = require("../models/PlanModel");

exports.getAllPlans = async (req, res) => {
    const plans = await Plans.find();
    res.status(200).json({
      status: "success",
      data: {
        plans,
      },
    });
  };

exports.createPlan = async (req, res) => {
    try {
      // Destructure fields from req.body
      const {
        plan_name,
        price,
        tagline,
        description,
        features,
        features_info,
        created_on,
      } = req.body;
  
      // Validate required fields
      if (
        !plan_name ||
        !price ||
        !tagline ||
        !description ||
        !features ||
        !features_info ||
        !created_on
      ) {
        throw new Error("All fields are required.");
      }
  
      // Create new plan
      const newPlan = await Plans.create({
        plan_name,
        price,
        tagline,
        description,
        features,
        features_info,
        created_on,
      });
  
      // Send success response
      res.status(201).json({
        status: "success",
        data: {
          plan: newPlan,
        },
      });
    } catch (error) {
      console.error("Error: ", error); // Log error for debugging
      res.status(400).json({
        status: "fail",
        message: error.message, // Send error message to client
      });
    }
  };

exports.getPlan=async (req, res) => {
    try{
      const plan= await Plans.findById(req.params.id);
      res.status(200).json({
        status:"success",
        data:{
          plan,
        }
      })
    }catch(error){
      res.status(404).json({
        status:"fail",
        message:error
      })
    }
  };
  