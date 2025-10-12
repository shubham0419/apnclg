const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controller/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', logout)

module.exports = router;