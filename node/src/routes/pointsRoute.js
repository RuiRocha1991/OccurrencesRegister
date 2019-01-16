'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/pointsController');

router.get('/getHoles',controller.getHoles);

module.exports=router; 