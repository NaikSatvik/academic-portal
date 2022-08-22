const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/stuDash', loginController.isAuth, (req, res) => {
    res.render('stuDash')
});

module.exports = router;