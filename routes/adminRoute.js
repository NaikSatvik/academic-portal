const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/adminDash', (req, res) => {      //isAuth not applied critical.
    res.render('adminDash')
});

router.get('/register', (req, res) => {
    res.render('registerUser')
});

router.post('/register', adminController.registerUser);

module.exports = router;