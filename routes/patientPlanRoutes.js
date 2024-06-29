const express = require('express');
const patientPlanController = require('./../controllers/patientPlanController');

const router=express.Router();

router
  .route('/')
  .get(patientPlanController.getAllPatientPlans)
  .post(patientPlanController.createPatientPlan);

router
  .route('/user/:userId')
  .get(patientPlanController.getUserPatientPlans);

module.exports = router;