const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const userRouter = require("./routes/userRoutes");
const patientRouter = require("./routes/patientRoutes");
const planRouter = require("./routes/planRoutes");
const patientPlanRouter = require("./routes/patientPlanRoutes");
const app = express();
const PORT = process.env.PORT || 8000;
const shortid =require("shortid");
const Razorpay = require("razorpay");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const razorPay = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
})
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


app.use("/api/users",userRouter);
app.use("/api/patients",patientRouter);
app.use("/api/plans",planRouter);
app.use("/api/patient-plans",patientPlanRouter);


app.get("/logo.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "Components", "Images", "Narayana_Health_Logo.jpg"));
});

app.post("/razorpay", async (req, res) => {
  const { amount } = req.body;
  const payment_capture = 1;
  const currency = "INR";

  const options = {
      amount: amount * 100, // converting amount to paise
      currency: currency,
      receipt: shortid.generate(),
      payment_capture
  };

  try {
      const response = await razorPay.orders.create(options);
      console.log(response);
      res.status(200).json({
          id: response.id,
          currency: response.currency,
          amount: response.amount
      });
  } catch (error) {
      console.error("Error in /razorpay:", error);
      res.status(500).json({
          error: error.message
      });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
