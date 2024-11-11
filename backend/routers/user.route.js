const express = require('express');
const authenticationMiddleware = require('../middlewares/authentication');

const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.register);
router.get('/me', authenticationMiddleware, userController.getMyUser);

module.exports = router;
