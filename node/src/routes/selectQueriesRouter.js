'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/selectQueriesController');

router.get('/getPointsByLocality', controller.getPointsByLocality);
router.get('/getLinesByLocality', controller.getLinesByLocality);
router.get('/getPolygonsByLocality', controller.getPolygonsByLocality);
router.get('/getPointsByPointAndRadius', controller.getPointsByPointAndRadius);
router.get('/getLinesByPointAndRadius', controller.getLinesByPointAndRadius);
router.get('/getPolygonsByPointAndRadius', controller.getPolygonsByPointAndRadius);
module.exports=router; 