const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', loginController.loginUser);
router.post('/logout', loginController.logoutUser);

module.exports = router;