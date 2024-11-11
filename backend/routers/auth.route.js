const express = require('express');
const authenticationMiddleware = require('../middlewares/authentication');

const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/', authController.login);
router.post('/resendVerificationEmail', authController.resendVerificationEmail);
router.post('/verifyEmail', authController.verifyEmail);
router.post('/logout', authenticationMiddleware, authController.logout);

router.post('/firebase', authController.registerOrLoginUser);

module.exports = router;
