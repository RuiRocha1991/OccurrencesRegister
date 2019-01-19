'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/polygonsControllers');

router.get('/getHoles',controller.getHoles);
router.get('/getLights',controller.getLights);
router.get('/getDeadBodies',controller.getDeadBodies);
router.get('/getInundation',controller.getInundations);
router.get('/getGarbage',controller.getGarbage);

router.post('/', controller.create);
router.delete('/', controller.delete);
router.put('/', controller.update);



module.exports=router; 