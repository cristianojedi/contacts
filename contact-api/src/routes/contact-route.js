'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.get('/:id', authService.authorize, controller.getById);
router.post('/', authService.authorize, controller.post);
router.patch('/:id', authService.authorize, controller.patch);
router.delete('/:id', authService.authorize, controller.delete);

module.exports = router;