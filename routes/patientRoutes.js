const express = require('express');
const patientController = require('./../controllers/patientController');

const router=express.Router();

router
  .route('/')
  .post(patientController.createPatient);

router
  .route('/:id')
  .get(patientController.getPatient)
  .delete(patientController.deletePatient);

router
  .route('/user/:userId')
  .get(patientController.getUserPatients);

module.exports = router;