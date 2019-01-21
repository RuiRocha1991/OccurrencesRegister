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
router.get('/getPointsByDate', controller.getPointsByDate);
router.get('/getLinesByDate', controller.getLinesByDate);
router.get('/getPolygonsByDate', controller.getPolygonsByDate);
router.get('/getLocalities', controller.getLocalities);
router.get('/getLocalityByMyLocation', controller.getLocalityByMyLocation);

module.exports=router; 