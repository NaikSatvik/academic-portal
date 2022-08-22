const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/facDash', loginController.isAuth, (req, res) => {
    res.render('facDash')
});

module.exports = router;