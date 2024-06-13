const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

// Load users from the JSON file
const usersFilePath = path.join(__dirname, "src", "files", "userdetails.json");
const patientsFilePath = path.join(
  __dirname,
  "src",
  "files",
  "patientdetails.json"
);
const plansFilePath = path.join(__dirname, "src", "files", "plandetails.json");
const users = JSON.parse(fs.readFileSync(usersFilePath));
const patients = JSON.parse(fs.readFileSync(patientsFilePath));
const plans = JSON.parse(fs.readFileSync(plansFilePath));

app.get("/api/users", (req, res) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
app.get("/api/plans", (req, res) => {
  res.status(200).json({
    status: "success",
    results: plans.length,
    data: {
      plans,
    },
  });
});
app.get("/api/users/:id", (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  // console.log(req.params);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// Endpoint for user signup
app.post("/api/users", (req, res) => {
  const { name, phoneNumber, email, date } = req.body;

  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading users file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const users = JSON.parse(data);
    const newID = users.length ? users[users.length - 1].id * 1 + 1 : 1;
    const mobileNumber = `+${phoneNumber}`;
    const newUser = { id: newID, name, mobileNumber, email, date };

    users.push(newUser);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Error writing users file:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json(newUser);
    });
  });
});
app.post("/api/patients", (req, res) => {
  const { user_id, name, gender, email, dob, address, Reg_date, Active } =
    req.body;

  fs.readFile(patientsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading patients file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const patients = JSON.parse(data);
    const patient_ID = patients.length
      ? patients[patients.length - 1].patient_id * 1 + 1
      : 1;
    // const mobileNumber = `+${phoneNumber}`;
    const newPatient = {
      patient_id: patient_ID,
      user_id,
      name,
      gender,
      email,
      dob,
      address,
      Reg_date,
      Active,
      show:true,
    };

    patients.push(newPatient);

    fs.writeFile(patientsFilePath, JSON.stringify(patients, null, 2), (err) => {
      if (err) {
        console.error("Error writing patients file:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json(newPatient);
    });
  });
});
app.get("/api/patients/user/:userId", (req, res) => {
  const userId = req.params.userId * 1;
  fs.readFile(patientsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading patients file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const patients = JSON.parse(data);
    const userPatients = patients.filter(
      (patient) => ((patient.user_id === userId) && patient.show===true)
    );

    res.status(200).json({
      status: "success",
      results: userPatients.length,
      data: {
        patients: userPatients,
      },
    });
  });
});
app.get("/api/patients/:id", (req, res) => {
  const id = req.params.id * 1;
  const patient = patients.find((el) => el.patient_id === id);
  if (!patient) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  // console.log(req.params);
  res.status(200).json({
    status: "success",
    data: {
      patient,
    },
  });
});

app.delete("/api/patients/:id", (req, res) => {
  const id = req.params.id * 1;

  fs.readFile(patientsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading patients file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let patients = JSON.parse(data);
    const patientIndex = patients.findIndex((patient) => patient.patient_id === id);

    if (patientIndex === -1) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    patients[patientIndex].show = false;
    // patients.splice(patientIndex, 1);

    fs.writeFile(patientsFilePath, JSON.stringify(patients, null, 2), (err) => {
      if (err) {
        console.error("Error writing patients file:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(204).json({
        status: "success",
        data: null,
      });
    });
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
