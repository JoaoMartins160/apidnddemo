const express = require('express')
const router = express.Router();
const userservice = require('../services/userservice');

router.post('/newuser', userservice.handleNewUser);
router.post('/login', userservice.handleLogin);
router.get('/logout', userservice.handleLogout);
router.get('/refresh', userservice.handleRefreshToken);

module.exports = router;