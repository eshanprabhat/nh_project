const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const app = express();
const PORT = process.env.PORT || 8000;
const Users = require("./models/UserModel");
const Plans = require("./models/PlanModel");
const Patients = require("./models/PatientModel");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connection Successful");
  });

// Load users from the JSON file
app.get("/api/users", async (req, res) => {
  const users = await Users.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

app.get("/api/plans", async (req, res) => {
  const plans = await Plans.find();
  res.status(200).json({
    status: "success",
    data: {
      plans,
    },
  });
});

app.post("/api/plans", async (req, res) => {
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
});

// Endpoint for user signup
app.post("/api/users", async (req, res) => {
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
});

app.post("/api/patients", async (req, res) => {
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
});

app.get("/api/patients/user/:userId", async(req, res) => {
  try{
  const userId = req.params.userId;
  const patients = await Patients.find({
    user_id: userId,
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
});


app.get("/api/patients/:id", async (req, res) => {
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
});

app.delete("/api/patients/:id", async(req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
