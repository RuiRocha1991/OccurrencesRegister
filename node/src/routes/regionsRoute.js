'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/regionsController');

router.get('/getRegion',controller.getRegion);

module.exports=router; 