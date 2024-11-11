const express = require('express');
const authenticationMiddleware = require('../middlewares/authentication');

const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/', authController.login);
router.post('/logout', authenticationMiddleware, authController.logout);

module.exports = router;
