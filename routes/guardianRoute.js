const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/guarDash', loginController.isAuth, (req, res) => {
    res.render('guarDash')
});

module.exports = router;